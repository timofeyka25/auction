package auction_api

import (
	"errors"
	"time"
)

type Role int

type Status int

type HistoryStatus int

const (
	Client    Role   = 1
	Staff     Role   = 2
	Admin     Role   = 3
	Ongoing   Status = 1
	Sold      Status = 2
	Cancelled Status = 3
)

type User struct {
	ID        int     `json:"-" db:"id"`
	FirstName string  `json:"first_name" db:"first_name"`
	LastName  *string `json:"last_name" db:"last_name"`
	Username  string  `json:"username" db:"username"`
	Password  string  `json:"password" db:"password_hash"`
	RoleId    int     `json:"role_id" db:"role_id"`
	IsActive  bool    `json:"is_active" db:"is_active"`
}

type UserInfo struct {
	ID        int     `json:"id" db:"id"`
	FirstName string  `json:"first_name" db:"first_name"`
	LastName  *string `json:"last_name" db:"last_name"`
	Username  string  `json:"username" db:"username"`
	RoleId    int     `json:"role_id" db:"role_id"`
	IsActive  bool    `json:"is_active" db:"is_active"`
}

type Product struct {
	ID            int       `json:"id" db:"id"`
	Title         string    `json:"title" db:"title"`
	Description   *string   `json:"description" db:"description"`
	CategoryId    int       `json:"category_id" db:"category_id"`
	LastBidUserId *int      `json:"last_bid_user_id" db:"last_bid_user_id"`
	CurrentPrice  float64   `json:"current_price" db:"current_price"`
	MinBidValue   float64   `json:"min_bid_value" db:"min_bid_value"`
	StartDatetime time.Time `json:"start_datetime" db:"start_datetime"`
	EndDatetime   time.Time `json:"end_datetime" db:"end_datetime"`
	Status        string    `json:"status" db:"status"`
}

type UpdateProductInput struct {
	Title         *string    `json:"title" db:"title"`
	Description   *string    `json:"description" db:"description"`
	CategoryId    *int       `json:"category_id" db:"category_id"`
	LastBidUserId *int       `json:"last_bid_user_id" db:"last_bid_user_id"`
	CurrentPrice  *float64   `json:"current_price" db:"current_price"`
	MinBidValue   *float64   `json:"min_bid_value" db:"min_bid_value"`
	StartDatetime *time.Time `json:"start_datetime" db:"start_datetime"`
	EndDatetime   *time.Time `json:"end_datetime" db:"end_datetime"`
	Status        *string    `json:"status" db:"status"`
}

type ProductCategory struct {
	Id       int    `json:"id" db:"id"`
	Category string `json:"category" db:"category"`
}

type Bid struct {
	Id          int       `json:"id" db:"id"`
	ProductId   int       `json:"product_id" db:"product_id"`
	UserId      int       `json:"user_id" db:"user_id"`
	Price       float64   `json:"price" db:"price"`
	BidDatetime time.Time `json:"bid_datetime" db:"bid_datetime"`
}

type BidInput struct {
	ProductId int     `json:"product_id" db:"product_id"`
	Price     float64 `json:"price" db:"price"`
}

func (i UpdateProductInput) Validate() error {
	if i.Title == nil && i.Description == nil && i.CategoryId == nil && i.StartDatetime == nil && i.EndDatetime == nil &&
		i.CurrentPrice == nil && i.MinBidValue == nil && i.LastBidUserId == nil && i.Status == nil {
		return errors.New("update structure has no values")
	}
	return nil
}
