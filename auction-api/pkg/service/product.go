package service

import (
	auction "auction-api"
	"auction-api/pkg/repo"
	"time"
)

type ProductService struct {
	repo repo.Product
}

func NewProductService(repo repo.Product) *ProductService {
	return &ProductService{repo: repo}
}

func (s *ProductService) CreateProduct(product auction.Product) (int, error) {
	product.Status = string(rune(auction.Ongoing))
	product.StartDatetime = time.Now()
	product.EndDatetime = time.Now().Add(time.Hour * 24)
	return s.repo.CreateProduct(product)
}

func (s *ProductService) GetAllProducts() ([]auction.Product, error) {
	return s.repo.GetAllProducts()
}

func (s *ProductService) GetProductByID(ID int) (auction.Product, error) {
	return s.repo.GetProductByID(ID)
}

func (s *ProductService) UpdateProduct(ID int, input auction.UpdateProductInput) error {
	if err := input.Validate(); err != nil {
		return err
	}

	return s.repo.UpdateProduct(ID, input)
}

func (s *ProductService) DeleteProduct(ID int) error {
	return s.repo.DeleteProduct(ID)
}

func (s *ProductService) CreateCategory(category string) (int, error) {
	return s.repo.CreateCategory(category)
}

func (s *ProductService) GetCategories() ([]auction.ProductCategory, error) {
	return s.repo.GetCategories()
}

func (s *ProductService) GetProductsByCategoryId(id int) ([]auction.Product, error) {
	return s.repo.GetProductsByCategoryId(id)
}
