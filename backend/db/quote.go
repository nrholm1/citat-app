package db

import (
	"database/sql"
	"nrholm1/citat-backend/models"
	"time"
)

func (db Database) GetAllQuotes() (*models.QuoteList, error) {
	list := &models.QuoteList{}
	rows, err := db.Conn.Query("SELECT * FROM quotes ORDER BY ID DESC")
	if err != nil {
		return list, err
	}
	for rows.Next() {
		var quote models.Quote
		err := rows.Scan(&quote.ID, &quote.Name, &quote.Text, &quote.Date, &quote.Karma)
		if err != nil {
			return list, err
		}
		list.Quotes = append(list.Quotes, quote)
	}
	return list, nil
}
func (db Database) AddQuote(quote *models.Quote) error {
	var id int
	var date string
	query := `INSERT INTO quotes (name, text) VALUES ($1, $2) RETURNING id, date`
	err := db.Conn.QueryRow(query, quote.Name, quote.Text).Scan(&id, &date)
	if err != nil {
		return err
	}
	quote.ID = id
	quote.Date, err = time.Parse("2006-01-02T15:04:05.000Z", date)
	return nil
}

func (db Database) GetQuoteById(QuoteId int) (models.Quote, error) {
	Quote := models.Quote{}
	query := `SELECT * FROM quotes WHERE id = $1;`
	row := db.Conn.QueryRow(query, QuoteId)
	switch err := row.Scan(&Quote.ID, &Quote.Name, &Quote.Text, &Quote.Date, &Quote.Karma); err {
	case sql.ErrNoRows:
		return Quote, ErrNoMatch
	default:
		return Quote, err
	}
}
func (db Database) DeleteQuote(QuoteId int) error {
	query := `DELETE FROM quotes WHERE id = $1;`
	_, err := db.Conn.Exec(query, QuoteId)
	switch err {
	case sql.ErrNoRows:
		return ErrNoMatch
	default:
		return err
	}
}
func (db Database) UpdateQuote(QuoteId int, QuoteData models.Quote) (models.Quote, error) {
	Quote := models.Quote{}
	query := `UPDATE quotes SET name=$1, description=$2 WHERE id=$3 RETURNING id, name, quote, date;`
	err := db.Conn.QueryRow(query, QuoteData.Name, QuoteData.Text, QuoteId).Scan(&Quote.ID, &Quote.Name, &Quote.Text, &Quote.Date, &Quote.Karma)
	if err != nil {
		if err == sql.ErrNoRows {
			return Quote, ErrNoMatch
		}
		return Quote, err
	}
	return Quote, nil
}

func (db Database) GetRandomQuote() (models.Quote, error) {
	Quote := models.Quote{}
	query := "SELECT * FROM quotes OFFSET floor(random() * (SELECT COUNT(*) FROM quotes)) LIMIT 1;"
	row := db.Conn.QueryRow(query)
	switch err := row.Scan(&Quote.ID, &Quote.Name, &Quote.Text, &Quote.Date, &Quote.Karma); err {
	case sql.ErrNoRows:
		return Quote, ErrNoMatch
	default:
		return Quote, err
	}
}
