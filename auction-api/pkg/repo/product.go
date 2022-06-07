package repo

import (
	auction "auction-api"
	"fmt"
	"github.com/jmoiron/sqlx"
	"strings"
	"time"
)

type ProductMysql struct {
	db *sqlx.DB
}

func NewProductMysql(db *sqlx.DB) *ProductMysql {
	return &ProductMysql{db: db}
}

func (m *ProductMysql) CreateProduct(product auction.Product) (int, error) {
	query := fmt.Sprintf("insert into %s (title, description, category_id, last_bid_user_id, current_price, "+
		"min_bid_value, start_datetime, end_datetime, status) values (?, ?, ?, ?, ?, ?, ?, ?, ?)", productTable)

	result, err := m.db.Exec(query, product.Title, product.Description, product.CategoryId, product.LastBidUserId,
		product.CurrentPrice, product.MinBidValue, product.StartDatetime, product.EndDatetime, product.Status)
	if err != nil {
		return 0, err
	}

	var id int64
	id, err = result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}

func (m *ProductMysql) GetAllProducts() ([]auction.Product, error) {
	var products []auction.Product
	query := fmt.Sprintf("select * from %s", productTable)
	err := m.db.Select(&products, query)

	return products, err
}

func (m *ProductMysql) GetProductByID(ID int) (auction.Product, error) {
	var product auction.Product
	query := fmt.Sprintf("select * from %s where ID = ?", productTable)
	err := m.db.Get(&product, query, ID)

	return product, err
}

func (m *ProductMysql) UpdateProduct(ID int, input auction.UpdateProductInput) error {
	setValues := make([]string, 0)
	args := make([]interface{}, 0)

	if input.Title != nil {
		setValues = append(setValues, fmt.Sprintf("title = ?"))
		args = append(args, *input.Title)
	}
	if input.Description != nil {
		setValues = append(setValues, fmt.Sprintf("Description = ?"))
		args = append(args, *input.Description)
	}
	if input.CategoryId != nil {
		setValues = append(setValues, fmt.Sprintf("category_id = ?"))
		args = append(args, *input.CategoryId)
	}
	if input.LastBidUserId != nil {
		setValues = append(setValues, fmt.Sprintf("last_bid_user_id = ?"))
		args = append(args, *input.LastBidUserId)
	}
	if input.CurrentPrice != nil {
		setValues = append(setValues, fmt.Sprintf("current_price = ?"))
		args = append(args, *input.CurrentPrice)
	}
	if input.MinBidValue != nil {
		setValues = append(setValues, fmt.Sprintf("min_bid_value = ?"))
		args = append(args, *input.MinBidValue)
	}
	if input.StartDatetime != nil {
		setValues = append(setValues, fmt.Sprintf("start_datetime = ?"))
		args = append(args, *input.StartDatetime)
	}
	if input.EndDatetime != nil {
		setValues = append(setValues, fmt.Sprintf("end_datetime = ?"))
		args = append(args, *input.EndDatetime)
	}
	if input.Status != nil {
		setValues = append(setValues, fmt.Sprintf("status = ?"))
		args = append(args, *input.Status)
	}
	setQuery := strings.Join(setValues, ", ")
	query := fmt.Sprintf("update %s set %s where ID = ?", productTable, setQuery)
	args = append(args, ID)

	_, err := m.db.Exec(query, args...)
	return err
}

func (m *ProductMysql) DeleteProduct(ID int) error {
	query := fmt.Sprintf("delete c from %s c where ID = ?", productTable)
	_, err := m.db.Exec(query, ID)

	return err
}

func (m *ProductMysql) CreateCategory(category string) (int, error) {
	query := fmt.Sprintf("insert into %s (category) values (?)", categoryTable)
	result, err := m.db.Exec(query, category)
	if err != nil {
		return 0, err
	}
	var id int64
	id, err = result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}

func (m *ProductMysql) GetAllCategories() ([]auction.ProductCategory, error) {
	var categories []auction.ProductCategory
	query := fmt.Sprintf("select c.id, c.category from %s c order by c.id not in(select category_id from %s);",
		categoryTable, productTable)
	err := m.db.Select(&categories, query)

	return categories, err
}

func (m *ProductMysql) GetCategories() ([]auction.ProductCategory, error) {
	var categories []auction.ProductCategory
	query := fmt.Sprintf("select c.id, c.category from %s c join %s p on c.id = p.category_id where p.status = 1 "+
		"group by c.id, c.category",
		categoryTable, productTable)
	err := m.db.Select(&categories, query)

	return categories, err
}

func (m *ProductMysql) GetProductsByCategoryId(ID int) ([]auction.Product, error) {
	var products []auction.Product
	query := fmt.Sprintf("select * from %s where category_id = ? order by end_datetime", productTable)
	err := m.db.Select(&products, query, ID)

	return products, err
}

func (m *ProductMysql) Update(datetime time.Time) error {
	query := fmt.Sprintf("update %s set status = 2 where end_datetime < ? and status = 1", productTable)
	_, err := m.db.Exec(query, datetime)

	return err
}

func (m *ProductMysql) GetBoughtProducts(id int) ([]auction.Product, error) {
	var products []auction.Product
	query := fmt.Sprintf("select p.* from %s p join %s u on u.id = p.last_bid_user_id where u.id = ? and p.status = ? "+
		"order by p.end_datetime desc",
		productTable, userTable)
	err := m.db.Select(&products, query, id, auction.Sold)

	return products, err
}
