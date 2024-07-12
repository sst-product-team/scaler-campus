package models

import (
	"os"
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {

	dsn := os.Getenv("DB_CONNECTION_STRING")
	if dsn == "" {
		panic("DB_CONNECTION_STRING environment variable is not set")
	}

	// Example of how the DSN should look like
	// root:password@tcp(db-mysite.com:1234)/db_name?ssl-mode=required&timeout=10s

	// Check if the DSN contains the "tcp" keyword and add if missing
	if !strings.Contains(dsn, "tcp(") {
		// Assuming the dsn format is username:password@host:port/dbname
		// Find the '@' character which is before the hostname
		atIndex := strings.LastIndex(dsn, "@")
		if atIndex == -1 {
			panic("Invalid DSN format")
		}

		// Insert "tcp(" after the '@' character and wrap the host:port with ")"
		dsn = dsn[:atIndex+1] + "tcp(" + dsn[atIndex+1:] + ")"
	}

	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}

	database.AutoMigrate(&User{}, &SigninStates{})

	DB = database
}
