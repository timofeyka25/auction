package service

import (
	auction "auction-api"
	"auction-api/pkg/repo"
)

type Authorization interface {
	CreateUser(user auction.User) (int, error)
	GenerateToken(username, password string) (string, error)
	ParseToken(token string) (int, int, error)
	ChangePassword(username, password, newPassword string) error
	GetUserRole(username, password string) (int, error)
	GetUserInfo(id int) (auction.UserInfo, error)
}

type Product interface {
	CreateProduct(product auction.Product) (int, error)
	GetAllProducts() ([]auction.Product, error)
	GetProductByID(ID int) (auction.Product, error)
	UpdateProduct(ID int, input auction.UpdateProductInput) error
	DeleteProduct(ID int) error
	CreateCategory(category string) (int, error)
	GetAllCategories() ([]auction.ProductCategory, error)
	GetCategories() ([]auction.ProductCategory, error)
	GetProductsByCategoryId(id int) ([]auction.Product, error)
}

type Bid interface {
	NewBid(UserId int, input auction.BidInput) (int, error)
	GetUserBids(userId int) ([]auction.Bid, error)
	GetProductBids(productId int) ([]auction.Bid, error)
	GetProductUserBids(userId, productId int) ([]auction.Bid, error)
}

type Admin interface {
	NewAdmin(userId int) error
	NewStaff(userId int) error
	NewClient(userId int) error
	DeactivateUser(userId int) error
	ActivateUser(userId int) error
	GetClients() ([]auction.UserInfo, error)
	GetStaff() ([]auction.UserInfo, error)
	GetAdmins() ([]auction.UserInfo, error)
}

type Service struct {
	Authorization
	Product
	Bid
	Admin
}

func NewService(repos *repo.Repository) *Service {
	return &Service{
		Authorization: NewAuthService(repos.Authorization),
		Product:       NewProductService(repos.Product),
		Bid:           NewBidService(repos.Bid),
		Admin:         NewAdminService(repos.Admin),
	}
}
