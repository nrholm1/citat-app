package utils

import (
	"fmt"
	"math"
	"nrholm1/citat-backend/models"
)

// CalculateOutcome calculates new ELO ratings from the outcome of two quotes matched up against each other
func CalculateOutcome(winner, loser models.Quote) (int, int) {
	winnerKarma := winner.Karma
	loserKarma := loser.Karma

	// calculate probabilities of winning for both winner and loser
	pWinner := 1.0 / (1.0 + math.Pow(10.0, (float64(loserKarma-winnerKarma)/400.0)))
	pLoser := 1.0 - pWinner

	newWinnerRating := float64(winnerKarma) + 32*(1-pWinner)
	newLoserRating := float64(loserKarma) - 32*(1-pLoser)

	fmt.Println("pWinner ", pWinner)
	fmt.Println("pLoser ", pLoser)
	fmt.Println("newWinnerRating ", newWinnerRating)
	fmt.Println("newLoserRating ", newLoserRating)

	return int(newWinnerRating), int(newLoserRating)

}
