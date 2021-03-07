package handler

import (
	"context"
	"fmt"
	"net/http"
	"nrholm1/citat-backend/db"
	"nrholm1/citat-backend/models"
	"strconv"

	"github.com/go-chi/chi"
	"github.com/go-chi/render"
)

var quoteIDKey = "quoteID"

func quotes(router chi.Router) {
	router.Get("/", getAllQuotes)
	router.Post("/", createQuote)
	router.Route("/{quoteId}", func(router chi.Router) {
		router.Use(QuoteContext)
		router.Get("/", getQuote)
		router.Put("/updateQuote", updateQuote)
		router.Delete("/", deleteQuote)
	})
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func QuoteContext(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		quoteID := chi.URLParam(r, "quoteId")
		if quoteID == "" {
			render.Render(w, r, ErrorRenderer(fmt.Errorf("quote ID is required")))
			return
		}
		id, err := strconv.Atoi(quoteID)
		if err != nil {
			render.Render(w, r, ErrorRenderer(fmt.Errorf("invalid quote ID")))
		}
		ctx := context.WithValue(r.Context(), quoteIDKey, id)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func createQuote(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)
	Quote := &models.Quote{}
	if err := render.Bind(r, Quote); err != nil {
		render.Render(w, r, ErrBadRequest)
		return
	}
	if err := dbInstance.AddQuote(Quote); err != nil {
		render.Render(w, r, ErrorRenderer(err))
		return
	}
	if err := render.Render(w, r, Quote); err != nil {
		render.Render(w, r, ServerErrorRenderer(err))
		return
	}
}

func getAllQuotes(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)
	Quotes, err := dbInstance.GetAllQuotes()
	if err != nil {
		render.Render(w, r, ServerErrorRenderer(err))
		return
	}
	if err := render.Render(w, r, Quotes); err != nil {
		render.Render(w, r, ErrorRenderer(err))
	}
}

func getQuote(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)
	QuoteID := r.Context().Value(quoteIDKey).(int)
	Quote, err := dbInstance.GetQuoteById(QuoteID)
	if err != nil {
		if err == db.ErrNoMatch {
			render.Render(w, r, ErrNotFound)
		} else {
			render.Render(w, r, ErrorRenderer(err))
		}
		return
	}
	if err := render.Render(w, r, &Quote); err != nil {
		render.Render(w, r, ServerErrorRenderer(err))
		return
	}
}

func deleteQuote(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)
	QuoteId := r.Context().Value(quoteIDKey).(int)
	err := dbInstance.DeleteQuote(QuoteId)
	if err != nil {
		if err == db.ErrNoMatch {
			render.Render(w, r, ErrNotFound)
		} else {
			render.Render(w, r, ServerErrorRenderer(err))
		}
		return
	}
}
func updateQuote(w http.ResponseWriter, r *http.Request) {
	setupResponse(&w, r)
	QuoteId := r.Context().Value(quoteIDKey).(int)
	QuoteData := models.Quote{}
	if err := render.Bind(r, &QuoteData); err != nil {
		render.Render(w, r, ErrBadRequest)
		return
	}
	Quote, err := dbInstance.UpdateQuote(QuoteId, QuoteData)
	if err != nil {
		if err == db.ErrNoMatch {
			render.Render(w, r, ErrNotFound)
		} else {
			render.Render(w, r, ServerErrorRenderer(err))
		}
		return
	}
	if err := render.Render(w, r, &Quote); err != nil {
		render.Render(w, r, ServerErrorRenderer(err))
		return
	}
}
