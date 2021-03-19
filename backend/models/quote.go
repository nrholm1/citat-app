package models

import (
	"fmt"
	"net/http"
	"time"
)

type Quote struct {
	ID    int       `json: "id"`
	Name  string    `json: "name"`
	Text  string    `json: "text"`
	Date  time.Time `json: "date"`
	Karma int       `json: "karma"`
}

type QuoteList struct {
	Quotes []Quote `json: "Quotes"`
}

func (q *Quote) Bind(r *http.Request) error {
	if q.Name == "" {
		return fmt.Errorf("name is a required field")
	}
	return nil
}

func (*QuoteList) Render(w http.ResponseWriter, r *http.Request) error {
	return nil
}

func (*Quote) Render(w http.ResponseWriter, r *http.Request) error {
	return nil
}
