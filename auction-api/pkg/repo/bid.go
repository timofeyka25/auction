package repo

import (
	auction "auction-api"
	"fmt"
	"github.com/jmoiron/sqlx"
)

type BidMysql struct {
	db *sqlx.DB
}

func NewBidMysql(db *sqlx.DB) *BidMysql {
	return &BidMysql{db: db}
}

func (b *BidMysql) NewBid(bid auction.Bid) (int, error) {
	tx, err := b.db.Begin()
	if err != nil {
		return 0, err
	}
	query := fmt.Sprintf("insert into %s (product_id, user_id, price, bid_datetime) values (?, ?, ?, ?)",
		bidTable)
	result, err := tx.Exec(query, bid.ProductId, bid.UserId, bid.Price, bid.BidDatetime)
	if err != nil {
		err = tx.Rollback()
		return 0, err
	}
	var id int64 = 0
	id, err = result.LastInsertId()
	if err != nil {
		err = tx.Rollback()
		return 0, err
	}
	updateQuery := fmt.Sprintf("update %s set current_price = current_price + ?, last_bid_user_id = ? where id = ?", productTable)
	_, err = tx.Exec(updateQuery, bid.Price, bid.UserId, bid.ProductId)
	if err != nil {
		err = tx.Rollback()
		return 0, err
	}
	return int(id), tx.Commit()
}

func (b *BidMysql) GetUserBids(userId int) ([]auction.Bid, error) {
	var bids []auction.Bid
	query := fmt.Sprintf("select * from %s where user_id = ? order by bid_datetime desc", bidTable)
	err := b.db.Select(&bids, query, userId)

	return bids, err
}

func (b *BidMysql) GetProductBids(productId int) ([]auction.Bid, error) {
	var bids []auction.Bid
	query := fmt.Sprintf("select * from %s where product_id = ?", bidTable)
	err := b.db.Select(&bids, query, productId)

	return bids, err
}

func (b *BidMysql) GetProductUserBids(userId, productId int) ([]auction.Bid, error) {
	var bids []auction.Bid
	query := fmt.Sprintf("select * from %s where user_id = ? and product_id = ?", bidTable)
	err := b.db.Select(&bids, query, userId, productId)

	return bids, err
}
