package repo

import (
	auction "auction-api"
	"github.com/jmoiron/sqlx"
)

type Authorization interface {
	CreateUser(user auction.User) (int, error)
	GetUser(username, password string) (auction.User, error)
}

type Product interface {
	CreateProduct(product auction.Product) (int, error)
	GetAllProducts() ([]auction.Product, error)
	GetProductByID(ID int) (auction.Product, error)
	UpdateProduct(ID int, input auction.UpdateProductInput) error
	DeleteProduct(ID int) error
	CreateCategory(category string) (int, error)
	GetCategories() ([]auction.ProductCategory, error)
	GetProductsByCategoryId(ID int) ([]auction.Product, error)
}

type Bid interface {
	NewBid(bid auction.Bid) (int, error)
	GetUserBids(userId int) ([]auction.Bid, error)
	GetProductBids(productId int) ([]auction.Bid, error)
	GetProductUserBids(userId, productId int) ([]auction.Bid, error)
}

type Repository struct {
	Authorization
	Product
	Bid
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Authorization: NewAuthMysql(db),
		Product:       NewProductMysql(db),
		Bid:           NewBidMysql(db),
	}
}
