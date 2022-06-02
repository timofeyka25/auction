package service

import (
	auction "auction-api"
	"auction-api/pkg/repo"
	"time"
)

type BidService struct {
	repo repo.Bid
}

func NewBidService(repo repo.Bid) *BidService {
	return &BidService{repo: repo}
}

func (b *BidService) NewBid(userId int, input auction.BidInput) (int, error) {
	var bid auction.Bid
	bid.Price = input.Price
	bid.ProductId = input.ProductId
	bid.BidDatetime = time.Now()
	bid.UserId = userId
	return b.repo.NewBid(bid)
}

func (b *BidService) GetUserBids(userId int) ([]auction.Bid, error) {
	return b.repo.GetUserBids(userId)
}

func (b *BidService) GetProductBids(productId int) ([]auction.Bid, error) {
	return b.repo.GetProductBids(productId)
}

func (b *BidService) GetProductUserBids(userId, productId int) ([]auction.Bid, error) {
	return b.repo.GetProductUserBids(userId, productId)
}
