

export const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "E-Delivery",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    "tags": [
      {
        "name": "User Authentication"
      },
      {
        "name": "Vendor subcategory"
      },
      {
        "name": "forgot/reset password"
      },
      {
        "name": "Vendor Category"
      },
      {
        "name": "Vendor Modifier Category"
      },
      {
        "name": "Vendor modifier"
      },
      {
        "name": "Business Type Master"
      },
      {
        "name": "Tax Master"
      },
      {
        "name": "Document Master"
      },
      {
        "name": "Country"
      },
      {
        "name": "City"
      },
      {
        "name": "Customer"
      },
      {
        "name": "Customer > order"
      },
      {
        "name": "Customer > cart"
      },
      {
        "name": "Customer > favourite product"
      },
      {
        "name": "Customer > product rating and reviews"
      },
      {
        "name": "Customer > vendor review and rating"
      },
      {
        "name": "Customer Address"
      },
      {
        "name": "Document"
      },
      {
        "name": "vendor"
      },
      {
        "name": "vendor > products"
      },
      {
        "name": "vendor > product tag"
      },
      {
        "name": "vendor > sub-category"
      },
      {
        "name": "vendor > category"
      },
      {
        "name": "vendor > modifier-category"
      },
      {
        "name": "vendor > modifier"
      },
      {
        "name": "vendor > product-image"
      },
      {
        "name": "vendor > modifier-mapping"
      },
      {
        "name": "vendor > promo-code"
      },
      {
        "name": "vendor > vendor-order"
      },
      {
        "name": "vendor > sales"
      },
      {
        "name": "vendor > product varient"
      },
      {
        "name": "vendor > dashboard"
      },
      {
        "name": "All user Login"
      },
      {
        "name": "admin"
      },
      {
        "name": "admin > user"
      },
      {
        "name": "admin > settings"
      }
    ],
    "paths": {
      "/api/v1/user/register": {
        "post": {
          "tags": [
            "User Authentication"
          ],
          "summary": "user registration",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "email": "customer@gmail.com",
                    "user_role": 2,
                    "first_name": "Yash",
                    "last_name": "Kumar",
                    "phone_number": "7894562356",
                    "address": "Bilaspur",
                    "gender": "Male",
                    "country": null,
                    "city": null,
                    "delivery_business": null,
                    "referral_code": null,
                    "password": "India@123"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/update-account": {
        "patch": {
          "tags": [
            "User Authentication"
          ],
          "summary": "update-account",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "email": "yashwant@gmail.com",
                    "first_name": "Yash",
                    "last_name": "Kumar",
                    "phone_number": "7894561236",
                    "address": "Bilaspur"
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFkYmQ3ZGQ0OTVjMmVlNzg5MDdjNDgiLCJlbWFpbCI6Inlhc2h3YW50QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYXNoIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiI3ODk0NTYxMjM2IiwiaWF0IjoxNzIyNjYzMTAyLCJleHAiOjE3MjI3NDk1MDJ9.1C5o7fd4QH2R_pM8B2Wc7NqIQQkECik1EQf8T8S2oog"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/login": {
        "post": {
          "tags": [
            "Customer > order"
          ],
          "summary": "admin login",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "email": "admin@gmail.com",
                    "password": "India@123"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/current-user": {
        "get": {
          "tags": [
            "User Authentication"
          ],
          "summary": "get user profile",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFkYmQ3ZGQ0OTVjMmVlNzg5MDdjNDgiLCJlbWFpbCI6Inlhc2h3YW50QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYXNoIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiI3ODk0NTYxMjM2IiwiaWF0IjoxNzIyNjgxNTU5LCJleHAiOjE3MjI3Njc5NTl9.VvDm71NkSuhza6QEWGiJl_V4wgiVDEutiZMr5IjCSxU"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/change-password": {
        "post": {
          "tags": [
            "User Authentication"
          ],
          "summary": "change password",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "oldPassword": "India@123",
                    "newPassword": "India@123"
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFkYmQ3ZGQ0OTVjMmVlNzg5MDdjNDgiLCJlbWFpbCI6Inlhc2h3YW50QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYXNoIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiI3ODk0NTYxMjM2IiwiaWF0IjoxNzIyNjgxNTU5LCJleHAiOjE3MjI3Njc5NTl9.VvDm71NkSuhza6QEWGiJl_V4wgiVDEutiZMr5IjCSxU"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/logout": {
        "post": {
          "tags": [
            "User Authentication"
          ],
          "summary": "logout",
          "requestBody": {
            "content": {}
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFkYmQ3ZGQ0OTVjMmVlNzg5MDdjNDgiLCJlbWFpbCI6Inlhc2h3YW50QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYXNoIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiI3ODk0NTYxMjM2IiwiaWF0IjoxNzIyNjgxNTU5LCJleHAiOjE3MjI3Njc5NTl9.VvDm71NkSuhza6QEWGiJl_V4wgiVDEutiZMr5IjCSxU"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/create-subcategory": {
        "post": {
          "tags": [
            "vendor > sub-category"
          ],
          "summary": "create-subcategory",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "name": "south Indian",
                    "sequence": 22,
                    "is_visible": true
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/update-subcategory/66b05e90190b873dfc3d3110": {
        "put": {
          "tags": [
            "Vendor subcategory"
          ],
          "summary": "update-subcategory",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "name": "pizza12",
                    "sequence": "2",
                    "is_visible": false
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFkYmQ3ZGQ0OTVjMmVlNzg5MDdjNDgiLCJlbWFpbCI6Inlhc2h3YW50QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYXNoIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiI3ODk0NTYxMjM2IiwiaWF0IjoxNzIyODM0Mzg3LCJleHAiOjE3MjI5MjA3ODd9.vBA6nV3xHd2FggiOBSNgw8JJNZNiUb-f-bx3YWIJulo"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-subcategory-by-id/66b05e90190b873dfc3d3110": {
        "get": {
          "tags": [
            "Vendor subcategory"
          ],
          "summary": "get-subcategory-by-id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFkYmQ3ZGQ0OTVjMmVlNzg5MDdjNDgiLCJlbWFpbCI6Inlhc2h3YW50QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYXNoIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiI3ODk0NTYxMjM2IiwiaWF0IjoxNzIyODM0Mzg3LCJleHAiOjE3MjI5MjA3ODd9.vBA6nV3xHd2FggiOBSNgw8JJNZNiUb-f-bx3YWIJulo"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-all-subcategory": {
        "get": {
          "tags": [
            "vendor > sub-category"
          ],
          "summary": "get-all-subcategories",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/delete-subcategory/66b05e90190b873dfc3d3110": {
        "delete": {
          "tags": [
            "Vendor subcategory"
          ],
          "summary": "delete-subcategory",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFkYmQ3ZGQ0OTVjMmVlNzg5MDdjNDgiLCJlbWFpbCI6Inlhc2h3YW50QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYXNoIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiI3ODk0NTYxMjM2IiwiaWF0IjoxNzIyODM0Mzg3LCJleHAiOjE3MjI5MjA3ODd9.vBA6nV3xHd2FggiOBSNgw8JJNZNiUb-f-bx3YWIJulo"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/generate-otp": {
        "post": {
          "tags": [
            "forgot/reset password"
          ],
          "summary": "genetare otp",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "emailOrPhone": "admin@gmail.com"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/verify-otp": {
        "post": {
          "tags": [
            "forgot/reset password"
          ],
          "summary": "verify otp",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "emailOrPhone": "admin@gmail.com",
                    "otp": "121129"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/reset-password": {
        "post": {
          "tags": [
            "forgot/reset password"
          ],
          "summary": "reset password",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "emailOrPhone": "admin@gmail.com",
                    "newPassword": "India@123"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/create-category": {
        "post": {
          "tags": [
            "vendor > category"
          ],
          "summary": "create-category",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "electronics"
                    },
                    "image": {
                      "type": "string",
                      "format": "binary"
                    },
                    "subCategories": {
                      "type": "string",
                      "example": "66b5e01f39b422b0421d9c71"
                    },
                    "sequence": {
                      "type": "integer",
                      "example": "885"
                    },
                    "is_visible": {
                      "type": "boolean",
                      "example": "true"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/update-category/66b096b74659adc512dd0075": {
        "put": {
          "tags": [
            "Vendor Category"
          ],
          "summary": "update-category",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "Chicken1"
                    },
                    "sequence": {
                      "type": "integer",
                      "example": "5"
                    },
                    "is_visible": {
                      "type": "string",
                      "example": "falsse"
                    },
                    "subCategories": {
                      "type": "string",
                      "example": "null"
                    },
                    "image": {
                      "type": "string",
                      "format": "binary"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFkYmQ3ZGQ0OTVjMmVlNzg5MDdjNDgiLCJlbWFpbCI6Inlhc2h3YW50QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYXNoIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiI3ODk0NTYxMjM2IiwiaWF0IjoxNzIyODM0Mzg3LCJleHAiOjE3MjI5MjA3ODd9.vBA6nV3xHd2FggiOBSNgw8JJNZNiUb-f-bx3YWIJulo"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-category-by-id/66b096b74659adc512dd0075": {
        "get": {
          "tags": [
            "Vendor Category"
          ],
          "summary": "get-category-by-id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFkYmQ3ZGQ0OTVjMmVlNzg5MDdjNDgiLCJlbWFpbCI6Inlhc2h3YW50QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYXNoIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiI3ODk0NTYxMjM2IiwiaWF0IjoxNzIyODM0Mzg3LCJleHAiOjE3MjI5MjA3ODd9.vBA6nV3xHd2FggiOBSNgw8JJNZNiUb-f-bx3YWIJulo"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-all-category": {
        "get": {
          "tags": [
            "vendor > category"
          ],
          "summary": "get-all-category",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/delete-category/66b096b74659adc512dd0075": {
        "get": {
          "tags": [
            "Vendor Category"
          ],
          "summary": "delete-category",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFkYmQ3ZGQ0OTVjMmVlNzg5MDdjNDgiLCJlbWFpbCI6Inlhc2h3YW50QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYXNoIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiI3ODk0NTYxMjM2IiwiaWF0IjoxNzIyODM0Mzg3LCJleHAiOjE3MjI5MjA3ODd9.vBA6nV3xHd2FggiOBSNgw8JJNZNiUb-f-bx3YWIJulo"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/create-modifier-category": {
        "post": {
          "tags": [
            "vendor > modifier-category"
          ],
          "summary": "create-modifier-category",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "name": "corn  toppings",
                    "is_visible": true
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/update-modifier-category/66b09f484659adc512dd007c": {
        "put": {
          "tags": [
            "Vendor Modifier Category"
          ],
          "summary": "update-modifier-category",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "name": "Extra Veg",
                    "is_visible": true
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFkYmQ3ZGQ0OTVjMmVlNzg5MDdjNDgiLCJlbWFpbCI6Inlhc2h3YW50QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYXNoIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiI3ODk0NTYxMjM2IiwiaWF0IjoxNzIyODM0Mzg3LCJleHAiOjE3MjI5MjA3ODd9.vBA6nV3xHd2FggiOBSNgw8JJNZNiUb-f-bx3YWIJulo"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-modifier-category-by-id/66b09f484659adc512dd007c": {
        "get": {
          "tags": [
            "Vendor Modifier Category"
          ],
          "summary": "get-modifier-category-by-id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFkYmQ3ZGQ0OTVjMmVlNzg5MDdjNDgiLCJlbWFpbCI6Inlhc2h3YW50QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYXNoIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiI3ODk0NTYxMjM2IiwiaWF0IjoxNzIyODM0Mzg3LCJleHAiOjE3MjI5MjA3ODd9.vBA6nV3xHd2FggiOBSNgw8JJNZNiUb-f-bx3YWIJulo"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-all-modifier-category": {
        "get": {
          "tags": [
            "vendor > modifier-category"
          ],
          "summary": "get-all-modifier-category",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/delete-modifier-category/66b09f484659adc512dd007c": {
        "delete": {
          "tags": [
            "Vendor Modifier Category"
          ],
          "summary": "delete-modifier-category",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFkYmQ3ZGQ0OTVjMmVlNzg5MDdjNDgiLCJlbWFpbCI6Inlhc2h3YW50QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYXNoIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiI3ODk0NTYxMjM2IiwiaWF0IjoxNzIyODM0Mzg3LCJleHAiOjE3MjI5MjA3ODd9.vBA6nV3xHd2FggiOBSNgw8JJNZNiUb-f-bx3YWIJulo"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/create-modifier": {
        "post": {
          "tags": [
            "vendor > modifier"
          ],
          "summary": "create-modifier",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "name": "chatney Topping",
                    "price": 80,
                    "sequence": 52,
                    "is_visible": true,
                    "modifier_category": "66b603bb4e7acf34a8dd3d97"
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/update-modifier/66b0a5844659adc512dd0089": {
        "put": {
          "tags": [
            "Vendor modifier"
          ],
          "summary": "update-modifier",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "name": "Onion1",
                    "price": 20.22,
                    "sequence": 2,
                    "is_visible": true,
                    "modifier_category": "66b09f484659adc512dd007c"
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFkYmQ3ZGQ0OTVjMmVlNzg5MDdjNDgiLCJlbWFpbCI6Inlhc2h3YW50QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYXNoIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiI3ODk0NTYxMjM2IiwiaWF0IjoxNzIyODM0Mzg3LCJleHAiOjE3MjI5MjA3ODd9.vBA6nV3xHd2FggiOBSNgw8JJNZNiUb-f-bx3YWIJulo"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-modifier-by-id/66b0a5844659adc512dd0089": {
        "get": {
          "tags": [
            "Vendor modifier"
          ],
          "summary": "get-modifier-by-id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFkYmQ3ZGQ0OTVjMmVlNzg5MDdjNDgiLCJlbWFpbCI6Inlhc2h3YW50QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYXNoIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiI3ODk0NTYxMjM2IiwiaWF0IjoxNzIyODM0Mzg3LCJleHAiOjE3MjI5MjA3ODd9.vBA6nV3xHd2FggiOBSNgw8JJNZNiUb-f-bx3YWIJulo"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-all-modifier": {
        "get": {
          "tags": [
            "vendor > modifier"
          ],
          "summary": "get-all-modifier",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/delete-modifier/undefined": {
        "delete": {
          "tags": [
            "Vendor modifier"
          ],
          "summary": "delete-modifier",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFkYmQ3ZGQ0OTVjMmVlNzg5MDdjNDgiLCJlbWFpbCI6Inlhc2h3YW50QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYXNoIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiI3ODk0NTYxMjM2IiwiaWF0IjoxNzIyODM0Mzg3LCJleHAiOjE3MjI5MjA3ODd9.vBA6nV3xHd2FggiOBSNgw8JJNZNiUb-f-bx3YWIJulo"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/create-business-type": {
        "post": {
          "tags": [
            "Business Type Master"
          ],
          "summary": "create-businness-type",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "Biryani Center"
                    },
                    "description": {
                      "type": "string",
                      "example": "Serve Special Biryani"
                    },
                    "is_store_can_create_group": {
                      "type": "boolean",
                      "example": "false"
                    },
                    "default_image": {
                      "type": "string",
                      "format": "binary"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjM2MjE3NDEsImV4cCI6MTcyMzcwODE0MX0.FFr7DHfVJbX2SwsTgqX0wEeT-JEPtF0l9bejwR6HV1Y"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/update-business-type/66b5c5d9c2e82523be65b341": {
        "put": {
          "tags": [
            "Business Type Master"
          ],
          "summary": "update-business-type",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "Pizza Point3"
                    },
                    "description": {
                      "type": "string",
                      "example": "Serve special pizza"
                    },
                    "is_store_can_create_group": {
                      "type": "boolean",
                      "example": "true"
                    },
                    "default_image": {
                      "type": "string",
                      "format": "binary"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjM2MjE3NDEsImV4cCI6MTcyMzcwODE0MX0.FFr7DHfVJbX2SwsTgqX0wEeT-JEPtF0l9bejwR6HV1Y"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/get-all-business-type": {
        "get": {
          "tags": [
            "Customer"
          ],
          "summary": "get all business type / category",
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/get-business-type/66b3421c1b97ed67d2c3453a": {
        "get": {
          "tags": [
            "Business Type Master"
          ],
          "summary": "get-business-type-by-id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMwMjM2NzcsImV4cCI6MTcyMzExMDA3N30.e1fqoKUl79YWs1lfndQ8f-_geQmZAgYk8eSXTfRX8Fk"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/delete-business-type/66b3421c1b97ed67d2c3453a": {
        "delete": {
          "tags": [
            "Business Type Master"
          ],
          "summary": "delete-business-type",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMwMjM2NzcsImV4cCI6MTcyMzExMDA3N30.e1fqoKUl79YWs1lfndQ8f-_geQmZAgYk8eSXTfRX8Fk"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/create-tax-master": {
        "post": {
          "tags": [
            "Tax Master"
          ],
          "summary": "create-tax-master",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "name": "Gst",
                    "rate": 5,
                    "country": null
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjM2MjE3NDEsImV4cCI6MTcyMzcwODE0MX0.FFr7DHfVJbX2SwsTgqX0wEeT-JEPtF0l9bejwR6HV1Y"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/update-tax-master/66b353bf4d78f846bec4a4db": {
        "put": {
          "tags": [
            "Tax Master"
          ],
          "summary": "update-tax-master",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "name": "GST",
                    "rate": 18,
                    "country": null
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMwMjM2NzcsImV4cCI6MTcyMzExMDA3N30.e1fqoKUl79YWs1lfndQ8f-_geQmZAgYk8eSXTfRX8Fk"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/get-all-tax-master": {
        "get": {
          "tags": [
            "Tax Master"
          ],
          "summary": "get-all-tax-master",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMwMjM2NzcsImV4cCI6MTcyMzExMDA3N30.e1fqoKUl79YWs1lfndQ8f-_geQmZAgYk8eSXTfRX8Fk"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/get-tax-master/66b353bf4d78f846bec4a4db": {
        "get": {
          "tags": [
            "Tax Master"
          ],
          "summary": "get-tax-master",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMwMjM2NzcsImV4cCI6MTcyMzExMDA3N30.e1fqoKUl79YWs1lfndQ8f-_geQmZAgYk8eSXTfRX8Fk"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/delete-tax-master/66b355dc4d78f846bec4a4ee": {
        "delete": {
          "tags": [
            "Tax Master"
          ],
          "summary": "delete-tax-master",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMwMjM2NzcsImV4cCI6MTcyMzExMDA3N30.e1fqoKUl79YWs1lfndQ8f-_geQmZAgYk8eSXTfRX8Fk"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/create-document-master": {
        "post": {
          "tags": [
            "Document Master"
          ],
          "summary": "create-document-master",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "name": "Id1",
                    "user_role": "66a9f9d4ffabce682ceb38ab",
                    "is_mandatory": false,
                    "is_visible": true,
                    "is_expiry_date": true,
                    "is_unique_code": true,
                    "abc": "123"
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMwMjM2NzcsImV4cCI6MTcyMzExMDA3N30.e1fqoKUl79YWs1lfndQ8f-_geQmZAgYk8eSXTfRX8Fk"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/update-document-master/66b358c34d78f846bec4a515": {
        "put": {
          "tags": [
            "Document Master"
          ],
          "summary": "update-document-master",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "name": "Id",
                    "user_role": "66a9f9d4ffabce682ceb38ab",
                    "is_mandatory": false,
                    "is_visible": true,
                    "is_expiry_date": true,
                    "is_unique_code": true
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMwMjM2NzcsImV4cCI6MTcyMzExMDA3N30.e1fqoKUl79YWs1lfndQ8f-_geQmZAgYk8eSXTfRX8Fk"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/get-all-document-master/": {
        "get": {
          "tags": [
            "Document Master"
          ],
          "summary": "get-all-document-master",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMwMjM2NzcsImV4cCI6MTcyMzExMDA3N30.e1fqoKUl79YWs1lfndQ8f-_geQmZAgYk8eSXTfRX8Fk"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/get-document-master/66b358c34d78f846bec4a515": {
        "get": {
          "tags": [
            "Document Master"
          ],
          "summary": "get-document-master",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMwMjM2NzcsImV4cCI6MTcyMzExMDA3N30.e1fqoKUl79YWs1lfndQ8f-_geQmZAgYk8eSXTfRX8Fk"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/delete-document-master/66b358c34d78f846bec4a51": {
        "delete": {
          "tags": [
            "Document Master"
          ],
          "summary": "delete-document-master",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMwMjM2NzcsImV4cCI6MTcyMzExMDA3N30.e1fqoKUl79YWs1lfndQ8f-_geQmZAgYk8eSXTfRX8Fk"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/get-all-country/": {
        "get": {
          "tags": [
            "Country"
          ],
          "summary": "get-all-country",
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/get-country/66a8cb86308b9eb1bc8eb261": {
        "get": {
          "tags": [
            "Country"
          ],
          "summary": "get-country-by-id",
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/get-all-city": {
        "get": {
          "tags": [
            "City"
          ],
          "summary": "get-all-city",
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/get-city/66a8cb86308b9eb1bc8eb262": {
        "get": {
          "tags": [
            "City"
          ],
          "summary": "get-city-by-id",
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/order/create-order": {
        "post": {
          "tags": [
            "Customer > order"
          ],
          "summary": "create order",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "order_type": "LOCAL DELIVERY",
                    "service_price": 5,
                    "service_tax": 1,
                    "total_delivery_price": 6,
                    "item_price": 20,
                    "total_item_price": 30,
                    "tip_amount": 2,
                    "net_total": 50,
                    "payment_status": "UNPAID",
                    "orderDetails": [
                      {
                        "product": "66bc4e17d59c675b8e136e7b",
                        "modifier": [
                          "66b99b3a576409419b1b24b3"
                        ],
                        "quantity": 2,
                        "price": 10
                      },
                      {
                        "product": "66bb218cf642cea86d3300ee",
                        "modifier": [
                          "66b60bfccf63d19bfda8d03b"
                        ],
                        "quantity": 4,
                        "price": 10
                      }
                    ],
                    "vendor": "66aa0b5af06160a6e332975b",
                    "delivery_address": "66c5ae06252bc93ac57ee80e"
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI2MTU2MzFmYTI1YWQ3OTA4YTQyOGMiLCJlbWFpbCI6ImN1c3RvbWVyQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYXNoIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiI3ODk0NTYyMzU2IiwiaWF0IjoxNzIzNTM4MjI5LCJleHAiOjE3MjQyMjk0Mjl9.XW5Q4fMatLftqhxJlbZ9CStAIsWEiDXV4DCJd_4laIw"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/order/get-all-orders": {
        "get": {
          "tags": [
            "Customer > order"
          ],
          "summary": "get all orders",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "description": "vendor login token use here",
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI2MTU2MzFmYTI1YWQ3OTA4YTQyOGMiLCJlbWFpbCI6ImN1c3RvbWVyQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJCYWxhamkiLCJsYXN0X25hbWUiOiJBYWRlc2giLCJwaG9uZV9udW1iZXIiOiIzNDk4NzQ1Mzg3IiwiaWF0IjoxNzI0ODI3MzIzLCJleHAiOjE3MjYxMjMzMjN9.AfmE4Ux3NnjxCYjMPEtBfZ_7w-241UsI9Mb3PFdrLHs"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/get-order-by-id/66bb287d4346599418436ef9": {
        "get": {
          "tags": [
            "Customer > order"
          ],
          "summary": "get order by order id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/create-user-cart": {
        "post": {
          "tags": [
            "Customer > cart"
          ],
          "summary": "create  user cart",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "product": "66c72beee364a6be9b7e3b0f",
                    "modifier": [
                      "66c72c9ee364a6be9b7e3b55",
                      "66c72c8be364a6be9b7e3b50"
                    ],
                    "quantity": 2,
                    "cart_price": 49.99
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI2MTU2MzFmYTI1YWQ3OTA4YTQyOGMiLCJlbWFpbCI6ImN1c3RvbWVyQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYnVzIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiIzNDk4NzQ1Mzg3IiwiaWF0IjoxNzI0MzMwNTgzLCJleHAiOjE3MjUwMjE3ODN9.WVXFFiSGITXPz-V-8KugOF8olxdmHVxgh3R8uFWRZOY"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/get-all-user-cart": {
        "get": {
          "tags": [
            "Customer > cart"
          ],
          "summary": "get all user cart data",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI2MTU2MzFmYTI1YWQ3OTA4YTQyOGMiLCJlbWFpbCI6ImN1c3RvbWVyQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYnVzIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiIzNDk4NzQ1Mzg3IiwiaWF0IjoxNzI0MzMwNTgzLCJleHAiOjE3MjUwMjE3ODN9.WVXFFiSGITXPz-V-8KugOF8olxdmHVxgh3R8uFWRZOY"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/delete-user-cart/66c732b3d342504088d49f0e": {
        "delete": {
          "tags": [
            "Customer > cart"
          ],
          "summary": "delete user cart data",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI2MTU2MzFmYTI1YWQ3OTA4YTQyOGMiLCJlbWFpbCI6ImN1c3RvbWVyQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJZYnVzIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJwaG9uZV9udW1iZXIiOiIzNDk4NzQ1Mzg3IiwiaWF0IjoxNzI0MzMwNTgzLCJleHAiOjE3MjUwMjE3ODN9.WVXFFiSGITXPz-V-8KugOF8olxdmHVxgh3R8uFWRZOY"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/create-favorite-product": {
        "post": {
          "tags": [
            "Customer > favourite product"
          ],
          "summary": "create favourite product",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "product": "66c5bf3b6a1a1502f8c93545"
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI2MTU2MzFmYTI1YWQ3OTA4YTQyOGMiLCJlbWFpbCI6ImN1c3RvbWVyQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJCYWxhamkiLCJsYXN0X25hbWUiOiJBYWRlc2giLCJwaG9uZV9udW1iZXIiOiIzNDk4NzQ1Mzg3IiwiaWF0IjoxNzI0NDgzNTc0LCJleHAiOjE3MjQ0ODM2MzR9.1gWjzlAviZHEvqMWqF2HDqMwWmFaY1VNL5_c0HL5r4U"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/get-all-favorite-product": {
        "get": {
          "tags": [
            "Customer > favourite product"
          ],
          "summary": "get all favourite product",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI2MTU2MzFmYTI1YWQ3OTA4YTQyOGMiLCJlbWFpbCI6ImN1c3RvbWVyQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJCYWxhamkiLCJsYXN0X25hbWUiOiJBYWRlc2giLCJwaG9uZV9udW1iZXIiOiIzNDk4NzQ1Mzg3IiwiaWF0IjoxNzI0NDgzNzgzLCJleHAiOjE3MjU3Nzk3ODN9.yQUBIgznBT2jeW60iGNvO9m0he3kttKNvTSrKS9oRhs"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/delete-favorite-product/66c98904ad46f33d3cdada9a": {
        "delete": {
          "tags": [
            "Customer > favourite product"
          ],
          "summary": "delete favourite product",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI2MTU2MzFmYTI1YWQ3OTA4YTQyOGMiLCJlbWFpbCI6ImN1c3RvbWVyQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJCYWxhamkiLCJsYXN0X25hbWUiOiJBYWRlc2giLCJwaG9uZV9udW1iZXIiOiIzNDk4NzQ1Mzg3IiwiaWF0IjoxNzI0NDgzNzgzLCJleHAiOjE3MjU3Nzk3ODN9.yQUBIgznBT2jeW60iGNvO9m0he3kttKNvTSrKS9oRhs"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/create-rating-review": {
        "post": {
          "tags": [
            "Customer > product rating and reviews"
          ],
          "summary": "create rating and reviews",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "product": {
                      "type": "string",
                      "example": "66cf0dd1f2d36a8c4df7837f"
                    },
                    "rating": {
                      "type": "integer",
                      "example": "1"
                    },
                    "review": {
                      "type": "string",
                      "example": "budget productstttt"
                    },
                    "images": {
                      "type": "string",
                      "format": "binary"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI2MTU2MzFmYTI1YWQ3OTA4YTQyOGMiLCJlbWFpbCI6ImN1c3RvbWVyQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJCYWxhamkiLCJsYXN0X25hbWUiOiJBYWRlc2giLCJwaG9uZV9udW1iZXIiOiIzNDk4NzQ1Mzg3IiwiaWF0IjoxNzI0OTMyMDM3LCJleHAiOjE3MjYyMjgwMzd9.dgkaQKRT_92AVfK59K0j9SBPq141hiIGIlETRb8QnhM"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/update-product-rating-review/66d044939bdac90db37c543c": {
        "put": {
          "tags": [
            "Customer > product rating and reviews"
          ],
          "summary": "update product rating and review by product id",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "rating": {
                      "type": "integer",
                      "example": "2"
                    },
                    "review": {
                      "type": "string",
                      "example": "good for this budget"
                    },
                    "images": {
                      "type": "string",
                      "format": "binary"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI2MTU2MzFmYTI1YWQ3OTA4YTQyOGMiLCJlbWFpbCI6ImN1c3RvbWVyQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJCYWxhamkiLCJsYXN0X25hbWUiOiJBYWRlc2giLCJwaG9uZV9udW1iZXIiOiIzNDk4NzQ1Mzg3IiwiaWF0IjoxNzI0OTMyMDM3LCJleHAiOjE3MjYyMjgwMzd9.dgkaQKRT_92AVfK59K0j9SBPq141hiIGIlETRb8QnhM"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/vendor-reviews-single-user/66aa0b5af06160a6e332975b": {
        "get": {
          "tags": [
            "Customer > product rating and reviews"
          ],
          "summary": "get-single-product-rating-review by product is",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI2MTU2MzFmYTI1YWQ3OTA4YTQyOGMiLCJlbWFpbCI6ImN1c3RvbWVyQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJCYWxhamkiLCJsYXN0X25hbWUiOiJBYWRlc2giLCJwaG9uZV9udW1iZXIiOiIzNDk4NzQ1Mzg3IiwiaWF0IjoxNzI0OTMyMDM3LCJleHAiOjE3MjYyMjgwMzd9.dgkaQKRT_92AVfK59K0j9SBPq141hiIGIlETRb8QnhM"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/create-vendor-rating-review": {
        "post": {
          "tags": [
            "Customer > vendor review and rating"
          ],
          "summary": "create vendor reaview and rating",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "rating": {
                      "type": "integer",
                      "example": "4"
                    },
                    "review": {
                      "type": "string",
                      "example": "good vendor products"
                    },
                    "images": {
                      "type": "string",
                      "format": "binary"
                    },
                    "vendor": {
                      "type": "string",
                      "example": "66aa0b5af06160a6e332975b"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/get-all-rating-reviews/66aa0b5af06160a6e332975b": {
        "post": {
          "tags": [
            "Customer > vendor review and rating"
          ],
          "summary": "get all user's rating and reviews by vendor id",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "limit": 3,
                    "page": 4
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/get-all-products-rating-review/66d044939bdac90db37c543c": {
        "post": {
          "tags": [
            "Customer > vendor review and rating"
          ],
          "summary": "get all rating and review by vendor id",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "limit": 3,
                    "page": 2
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI2MTU2MzFmYTI1YWQ3OTA4YTQyOGMiLCJlbWFpbCI6ImN1c3RvbWVyQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJCYWxhamkiLCJsYXN0X25hbWUiOiJBYWRlc2giLCJwaG9uZV9udW1iZXIiOiIzNDk4NzQ1Mzg3IiwiaWF0IjoxNzI1NDM1NDAzLCJleHAiOjE3MjY3MzE0MDN9.tcShqQ2Ggon3woQA0_-DAAClLgc6mSZ-at3VMcGkW5M"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/delete-vendor-review-images/66aa0b5af06160a6e332975b": {
        "patch": {
          "tags": [
            "Customer > vendor review and rating"
          ],
          "summary": "delete vendor review image by vendor id",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "imageUrls": [
                      "http://res.cloudinary.com/doyb9ojic/image/upload/v1726146089/wfgd21fc5igymubbj3ve.jpg"
                    ]
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmI2MTU2MzFmYTI1YWQ3OTA4YTQyOGMiLCJlbWFpbCI6ImN1c3RvbWVyQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJCYWxhamkiLCJsYXN0X25hbWUiOiJBYWRlc2giLCJwaG9uZV9udW1iZXIiOiIzNDk4NzQ1Mzg3IiwiaWF0IjoxNzI0OTMyMDM3LCJleHAiOjE3MjYyMjgwMzd9.dgkaQKRT_92AVfK59K0j9SBPq141hiIGIlETRb8QnhM"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/get-all-nearby-store": {
        "get": {
          "tags": [
            "Customer"
          ],
          "summary": "get-all-near-by-store",
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/get-all-popular-store": {
        "get": {
          "tags": [
            "Customer"
          ],
          "summary": "get-all-popular-store",
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/get-business-type-store/66b34ba34d78f846bec4a4bd": {
        "post": {
          "tags": [
            "Customer"
          ],
          "summary": "get-business-type-store",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "limit": 3,
                    "page": 2,
                    "filter": {
                      "address": "block 106, Bilaspur"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/get-all-document-master": {
        "get": {
          "tags": [
            "Customer"
          ],
          "summary": "get-all-document-master",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMxMTUxODAsImV4cCI6MTcyMzIwMTU4MH0.jJwsi0-HN95mp1dghtMjVt7C-vB68y1DGsfq_qqBfpg"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/get-all-products/66aa0b5af06160a6e332975b": {
        "post": {
          "tags": [
            "Customer"
          ],
          "summary": "get all products by vendor id",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "limit": 3,
                    "page": 2,
                    "filter": {
                      "sales_price": 79999
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/get-all-category/66aa0b5af06160a6e332975b": {
        "get": {
          "tags": [
            "Customer"
          ],
          "summary": "get all categories by vendor id",
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/get-all-subcategory-products/66bb598c3225e7b040b4bf4c": {
        "get": {
          "tags": [
            "Customer"
          ],
          "summary": "get all  subcategory product by subcategoryId",
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/get-product/66d044939bdac90db37c543c": {
        "get": {
          "tags": [
            "Customer"
          ],
          "summary": "get proudct by id  without token",
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/create-address": {
        "post": {
          "tags": [
            "Customer Address"
          ],
          "summary": "create-address",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "name": "Bilaspur",
                    "location": "talapara raipur road",
                    "flat_no": "1235689",
                    "street": "talapara road",
                    "landmark": "sheetala street 1"
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMxMTc2ODAsImV4cCI6MTcyMzIwNDA4MH0.FXtQjs72Fhil1zhL7bsL893IhZovg1mle2tO5IBgZ5U"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/update-address/66b4a9ad9a6dd70ecceb4845": {
        "put": {
          "tags": [
            "Customer Address"
          ],
          "summary": "update-address",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "name": "Bilaspur1",
                    "location": "talapara bilaspur",
                    "flat_no": "245",
                    "street": "talapara",
                    "landmark": "sheetala street"
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMxMTUxODAsImV4cCI6MTcyMzIwMTU4MH0.jJwsi0-HN95mp1dghtMjVt7C-vB68y1DGsfq_qqBfpg"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/get-all-address": {
        "get": {
          "tags": [
            "Customer Address"
          ],
          "summary": "get-all-address",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMxMTUxODAsImV4cCI6MTcyMzIwMTU4MH0.jJwsi0-HN95mp1dghtMjVt7C-vB68y1DGsfq_qqBfpg"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/get-address-by-id/66b4a9ad9a6dd70ecceb4845": {
        "get": {
          "tags": [
            "Customer Address"
          ],
          "summary": "get-address-by-id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMxMTUxODAsImV4cCI6MTcyMzIwMTU4MH0.jJwsi0-HN95mp1dghtMjVt7C-vB68y1DGsfq_qqBfpg"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/user/delete-address/66b4a9ad9a6dd70ecceb4845": {
        "delete": {
          "tags": [
            "Customer Address"
          ],
          "summary": "delete-address",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMxMTUxODAsImV4cCI6MTcyMzIwMTU4MH0.jJwsi0-HN95mp1dghtMjVt7C-vB68y1DGsfq_qqBfpg"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/create-document": {
        "post": {
          "tags": [
            "Document"
          ],
          "summary": "create-document",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "Id"
                    },
                    "expiry_date": {
                      "type": "string",
                      "example": "2025-12-10"
                    },
                    "unique_code": {
                      "type": "integer",
                      "example": "789456235678"
                    },
                    "image": {
                      "type": "string",
                      "format": "binary"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMxODM2NTAsImV4cCI6MTcyMzI3MDA1MH0.CHVDVbgl3aPIVD6zsbhO3ezN6vs8dzvzrnVwO4bmegM"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/update-document/66b5b462861edc981e0a3d69": {
        "put": {
          "tags": [
            "Document"
          ],
          "summary": "update-document",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "Id"
                    },
                    "expiry_date": {
                      "type": "string",
                      "example": "2025-12-09"
                    },
                    "unique_code": {
                      "type": "integer",
                      "example": "789456235678"
                    },
                    "image": {
                      "type": "string",
                      "format": "binary"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMxODM2NTAsImV4cCI6MTcyMzI3MDA1MH0.CHVDVbgl3aPIVD6zsbhO3ezN6vs8dzvzrnVwO4bmegM"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/get-all-document": {
        "get": {
          "tags": [
            "Document"
          ],
          "summary": "get-all-document",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMxODM2NTAsImV4cCI6MTcyMzI3MDA1MH0.CHVDVbgl3aPIVD6zsbhO3ezN6vs8dzvzrnVwO4bmegM"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/get-document/66b5b462861edc981e0a3d69": {
        "get": {
          "tags": [
            "Document"
          ],
          "summary": "get-document-by-id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMxODM2NTAsImV4cCI6MTcyMzI3MDA1MH0.CHVDVbgl3aPIVD6zsbhO3ezN6vs8dzvzrnVwO4bmegM"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/master/delete-document/66b5b462861edc981e0a3d69": {
        "delete": {
          "tags": [
            "Document"
          ],
          "summary": "delete-document",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjMxODM2NTAsImV4cCI6MTcyMzI3MDA1MH0.CHVDVbgl3aPIVD6zsbhO3ezN6vs8dzvzrnVwO4bmegM"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-all-products": {
        "get": {
          "tags": [
            "vendor > products"
          ],
          "summary": "get all products",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJNeSBTaG9wIiwibGFzdF9uYW1lIjpudWxsLCJwaG9uZV9udW1iZXIiOiI5MTU0NjY1NzQ1NjQiLCJpYXQiOjE3MjQ0ODMzMDQsImV4cCI6MTcyNDQ4MzM2NH0.aS0QtMr9-194B-wZ0Otdy6eDQvbdYjXJrNGJBVdEe9k"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-product-by-id/66f52407b0d955ae696407e5": {
        "get": {
          "tags": [
            "vendor > products"
          ],
          "summary": "get product by product id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTAxODI1LCJleHAiOjE3MjM3OTMwMjV9.jZVhC_8T0tgJTlS5_ycgX6NIqpI_HxKQsBSs7pQtFSw"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/update-product/66b9a0d7a04d0807974b8ae0": {
        "put": {
          "tags": [
            "vendor > products"
          ],
          "summary": "update product by product id",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "medical equipments"
                    },
                    "brand": {
                      "type": "string",
                      "example": "sun-pharma"
                    },
                    "model": {
                      "type": "integer",
                      "example": "85471"
                    },
                    "serial_number": {
                      "type": "string",
                      "example": "cg45trlpk56"
                    },
                    "primary_image": {
                      "type": "string",
                      "format": "binary"
                    },
                    "sales_price": {
                      "type": "integer",
                      "example": "950"
                    },
                    "cost_price": {
                      "type": "integer",
                      "example": "700"
                    },
                    "tax": {
                      "type": "string",
                      "example": "66b353bf4d78f846bec4a4db"
                    },
                    "sub_category": {
                      "type": "string",
                      "example": "66b071a9abf54bea59fecea5"
                    },
                    "description": {
                      "type": "string",
                      "example": "medical equipments"
                    },
                    "is_visible": {
                      "type": "boolean",
                      "example": "true"
                    },
                    "in_stock": {
                      "type": "boolean",
                      "example": "true"
                    },
                    "sequence": {
                      "type": "integer",
                      "example": "8574"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTAxODI1LCJleHAiOjE3MjM3OTMwMjV9.jZVhC_8T0tgJTlS5_ycgX6NIqpI_HxKQsBSs7pQtFSw"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/delete-product/66f52ca2670f8456e9d21e89": {
        "delete": {
          "tags": [
            "vendor > products"
          ],
          "summary": "delete product by product id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTAxODI1LCJleHAiOjE3MjM3OTMwMjV9.jZVhC_8T0tgJTlS5_ycgX6NIqpI_HxKQsBSs7pQtFSw"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/create-product": {
        "post": {
          "tags": [
            "vendor > products"
          ],
          "summary": "create products",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "SM 671 | Stylish, Comfortable | Sneakers For Men  (Black , 9)"
                    },
                    "brand": {
                      "type": "string",
                      "example": "Sparx"
                    },
                    "model": {
                      "type": "string",
                      "example": "SM 671 "
                    },
                    "serial_number": {
                      "type": "string",
                      "example": "SM671M"
                    },
                    "primary_image": {
                      "type": "string",
                      "format": "binary"
                    },
                    "tax": {
                      "type": "string",
                      "description": "tax is a master so it require tax id here",
                      "example": "66b353bf4d78f846bec4a4db"
                    },
                    "sub_category": {
                      "type": "string",
                      "description": "subcategory requires subcategory id",
                      "example": "66b071a9abf54bea59fecea5"
                    },
                    "description": {
                      "type": "string",
                      "example": "Casual Sneaker Shoes for Men | Classic Rounded Toe, Soothing Insole Sneakers For Men"
                    },
                    "is_visible": {
                      "type": "boolean",
                      "example": "true"
                    },
                    "sequence": {
                      "type": "integer",
                      "example": "4589"
                    },
                    "product_color": {
                      "type": "string",
                      "example": "black"
                    },
                    "additional_info": {
                      "type": "string",
                      "example": "no additional information is available "
                    },
                    "specification": {
                      "type": "string",
                      "example": "plastic sole and grip , not for running"
                    },
                    "cancellation_policy": {
                      "type": "string",
                      "example": "available"
                    },
                    "replacement_policy": {
                      "type": "string",
                      "example": "withing 7 days"
                    },
                    "return_policy": {
                      "type": "string",
                      "example": "valid only if product condition is good at the time of delevered"
                    },
                    "product_details[0][product_size]": {
                      "type": "integer",
                      "example": "6"
                    },
                    "product_details[0][mrp_price]": {
                      "type": "integer",
                      "example": "1300"
                    },
                    "product_details[0][sales_price]": {
                      "type": "integer",
                      "example": "1200"
                    },
                    "product_details[0][stock]": {
                      "type": "integer",
                      "example": "6"
                    },
                    "product_details[0][product_width]": {
                      "type": "integer",
                      "example": "6"
                    },
                    "product_details[0][product_height]": {
                      "type": "integer",
                      "example": "3"
                    },
                    "product_details[0][product_depth]": {
                      "type": "integer",
                      "example": "3"
                    },
                    "product_details[0][product_weight]": {
                      "type": "integer",
                      "example": "700"
                    },
                    "product_details[1][product_size]": {
                      "type": "integer",
                      "example": "7"
                    },
                    "product_details[1][mrp_price]": {
                      "type": "integer",
                      "example": "1500"
                    },
                    "product_details[1][sales_price]": {
                      "type": "integer",
                      "example": "1400"
                    },
                    "product_details[1][stock]": {
                      "type": "integer",
                      "example": "2"
                    },
                    "product_details[1][product_width]": {
                      "type": "integer",
                      "example": "6"
                    },
                    "product_details[1][product_height]": {
                      "type": "integer",
                      "example": "3"
                    },
                    "product_details[1][product_depth]": {
                      "type": "integer",
                      "example": "2"
                    },
                    "product_details[1][product_weight]": {
                      "type": "integer",
                      "example": "400"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJNeSBTaG9wIiwibGFzdF9uYW1lIjpudWxsLCJwaG9uZV9udW1iZXIiOiI5MTU0NjY1NzQ1NjQiLCJpYXQiOjE3MjcxNjA3MTEsImV4cCI6MTcyODQ1NjcxMX0.S750LkWGImEegNCW23fTqrhxMYj-DCqBth_TsVkjHZU"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/create-product-tag": {
        "post": {
          "tags": [
            "vendor > product tag"
          ],
          "summary": "create product tag",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "tag": "spicy food"
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-all-product-tags": {
        "get": {
          "tags": [
            "vendor > product tag"
          ],
          "summary": "get all proudct tags",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-product-tag-by-id/66b5bc1a66278401d83a9a57": {
        "get": {
          "tags": [
            "vendor > product tag"
          ],
          "summary": "get tag by tag_id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/update-product-tag/66b5bc1a66278401d83a9a57": {
        "put": {
          "tags": [
            "vendor > product tag"
          ],
          "summary": "update product tag by tag_id",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "tag": "extra-spicy-food",
                    "desert": "icecream"
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/delete-product-tag/66b5bc1a66278401d83a9a57": {
        "delete": {
          "tags": [
            "vendor > product tag"
          ],
          "summary": "delete product tag by tag_id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/delete-subcategory/66b5e8158552b5f711eed4de": {
        "delete": {
          "tags": [
            "vendor > sub-category"
          ],
          "summary": "delete subcategory by id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-subcategory-by-id/66b9e2b1940e38c10cd2c2ce": {
        "get": {
          "tags": [
            "vendor > sub-category"
          ],
          "summary": "get-subcategory-by-subcategory_id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/update-subcategory/66b5e08b39b422b0421d9c83": {
        "put": {
          "tags": [
            "vendor > sub-category"
          ],
          "summary": "update-subcategory-by-id",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "name": "Mobile-phone",
                    "sequence": 3,
                    "is_visible": true
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-category-by-id/66b5efac4e7acf34a8dd3d3e": {
        "get": {
          "tags": [
            "vendor > category"
          ],
          "summary": "get-category-by-category_id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/delete-category/66b5efac4e7acf34a8dd3d3e": {
        "delete": {
          "tags": [
            "vendor > category"
          ],
          "summary": "delete-category-by-category_id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/update-category/66b5efac4e7acf34a8dd3d3e": {
        "put": {
          "tags": [
            "vendor > category"
          ],
          "summary": "update-category-by-category_id",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "electronics"
                    },
                    "image": {
                      "type": "string",
                      "format": "binary"
                    },
                    "subCategories": {
                      "type": "string",
                      "example": "66b21843d12d5c0ad4157a8e"
                    },
                    "is_visible": {
                      "type": "boolean",
                      "example": "true"
                    },
                    "sequence": {
                      "type": "integer",
                      "example": "2626"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-modifier-category-by-id/66b6042c4e7acf34a8dd3da0": {
        "get": {
          "tags": [
            "vendor > modifier-category"
          ],
          "summary": "get-all-modifier-category-by-id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/delete-modifier-category/66b6041b4e7acf34a8dd3d9d": {
        "delete": {
          "tags": [
            "vendor > modifier-category"
          ],
          "summary": "delete-modifier-category-by-id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/update-modifier-category/66b605df4e7acf34a8dd3db7": {
        "put": {
          "tags": [
            "vendor > modifier-category"
          ],
          "summary": "update-modier-category-by-id",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "name": "corns topping",
                    "is_visible": true
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-modifier-by-id/66b60bfccf63d19bfda8d03b": {
        "get": {
          "tags": [
            "vendor > modifier"
          ],
          "summary": "get-modifier-by-id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/update-modifier/66b60bfccf63d19bfda8d03b": {
        "put": {
          "tags": [
            "vendor > modifier"
          ],
          "summary": "update-modifier-by-id",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "name": "chatneys Topping",
                    "price": 80,
                    "sequence": 52,
                    "is_visible": true,
                    "modifier_category": "66b603bb4e7acf34a8dd3d97"
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/delete-modifier/66b60bfccf63d19bfda8d03b": {
        "delete": {
          "tags": [
            "vendor > modifier"
          ],
          "summary": "delete-modifier-by-id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/create-product-images": {
        "post": {
          "tags": [
            "vendor > product-image"
          ],
          "summary": "create-product-image",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "product": {
                      "type": "string",
                      "description": "product id",
                      "example": "66b9a0d7a04d0807974b8ae0"
                    },
                    "image": {
                      "type": "string",
                      "description": "here atleast 1 image is required and max 4 image allowed",
                      "format": "binary"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTAxODI1LCJleHAiOjE3MjM3OTMwMjV9.jZVhC_8T0tgJTlS5_ycgX6NIqpI_HxKQsBSs7pQtFSw"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-all-product-images/66b9af95dfa8bc1343ddf87d": {
        "get": {
          "tags": [
            "vendor > product-image"
          ],
          "summary": "get all products image by product id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTAxODI1LCJleHAiOjE3MjM3OTMwMjV9.jZVhC_8T0tgJTlS5_ycgX6NIqpI_HxKQsBSs7pQtFSw"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-product-image/66b9af95dfa8bc1343ddf87d": {
        "get": {
          "tags": [
            "vendor > product-image"
          ],
          "summary": "get product image by product's image id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTAxODI1LCJleHAiOjE3MjM3OTMwMjV9.jZVhC_8T0tgJTlS5_ycgX6NIqpI_HxKQsBSs7pQtFSw"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/update-product-image/66b9af95dfa8bc1343ddf87d": {
        "put": {
          "tags": [
            "vendor > product-image"
          ],
          "summary": "update product image by image id",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "product": {
                      "type": "string",
                      "description": "product id which contain images and each image has a unique id. here in params one of the image id is given and update that id's data",
                      "example": "66b9a0d7a04d0807974b8ae0"
                    },
                    "image": {
                      "type": "string",
                      "format": "binary"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTAxODI1LCJleHAiOjE3MjM3OTMwMjV9.jZVhC_8T0tgJTlS5_ycgX6NIqpI_HxKQsBSs7pQtFSw"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/delete-product-image/66b9af95dfa8bc1343ddf87d": {
        "delete": {
          "tags": [
            "vendor > product-image"
          ],
          "summary": "delete product's image by product's image id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTAxODI1LCJleHAiOjE3MjM3OTMwMjV9.jZVhC_8T0tgJTlS5_ycgX6NIqpI_HxKQsBSs7pQtFSw"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/create-modifier-mapping": {
        "post": {
          "tags": [
            "vendor > modifier-mapping"
          ],
          "summary": "create-modifier-mapping",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "product": "66b9a0d7a04d0807974b8ae0",
                    "modifier_category": "66b9a4f898e0d480353f5417",
                    "default_selected_modifier": "66b99b3a576409419b1b24b3",
                    "modifier": "66b99b3a576409419b1b24b3",
                    "type": "Select",
                    "sequence_no": 5201,
                    "min": 6,
                    "max": 10,
                    "is_add_quantity": true,
                    "is_modifier_settings": "true",
                    "is_visible": true
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTAxODI1LCJleHAiOjE3MjM3OTMwMjV9.jZVhC_8T0tgJTlS5_ycgX6NIqpI_HxKQsBSs7pQtFSw"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-all-modifier-mappings/66b33a73f32881f751864e21": {
        "get": {
          "tags": [
            "vendor > modifier-mapping"
          ],
          "summary": "get all modifier by product id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-modifier-mapping-by-id/66b9be3adfa8bc1343ddf8c4": {
        "get": {
          "tags": [
            "vendor > modifier-mapping"
          ],
          "summary": "update modifier mapping by modifier mapping id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/delete-modifier-mapping/66b9be3adfa8bc1343ddf8c4": {
        "delete": {
          "tags": [
            "vendor > modifier-mapping"
          ],
          "summary": "delete modifier mapping by modifier mapping id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/create-promo-code": {
        "post": {
          "tags": [
            "vendor > promo-code"
          ],
          "summary": "create-promo-code",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "promo_code": {
                      "type": "string",
                      "example": "MAH2610KD"
                    },
                    "image": {
                      "type": "string",
                      "format": "binary"
                    },
                    "discount_type": {
                      "type": "string",
                      "example": "Percentage"
                    },
                    "discount": {
                      "type": "integer",
                      "example": "18"
                    },
                    "description": {
                      "type": "string",
                      "example": "this is promo code api testing2"
                    },
                    "active": {
                      "type": "boolean",
                      "example": "true"
                    },
                    "promo_for": {
                      "type": "string",
                      "example": "Store"
                    },
                    "sub_category": {
                      "type": "string",
                      "example": "66b9e2b1940e38c10cd2c2ce"
                    },
                    "product": {
                      "type": "string",
                      "example": "66b33a73f32881f751864e21"
                    },
                    "is_validation_date": {
                      "type": "boolean",
                      "example": "true"
                    },
                    "start_date": {
                      "type": "string",
                      "example": "2024-08-13T14:23:45.000Z"
                    },
                    "end_date": {
                      "type": "string",
                      "example": "2024-08-15T14:23:45.000Z"
                    },
                    "repeat": {
                      "type": "string",
                      "example": "Weekly"
                    },
                    "apply_offer_after_orders": {
                      "type": "integer",
                      "example": "3"
                    },
                    "required_uses": {
                      "type": "integer",
                      "example": "2"
                    },
                    "min_item_on_cart": {
                      "type": "integer",
                      "example": "3"
                    },
                    "min_order_amount": {
                      "type": "integer",
                      "example": "2"
                    },
                    "max_discount_amount": {
                      "type": "integer",
                      "example": "50"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-all-promo-codes": {
        "get": {
          "tags": [
            "vendor > promo-code"
          ],
          "summary": "get-all-promo-codes",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-promo-code-by-id/66baf7636eded032e576e633": {
        "get": {
          "tags": [
            "vendor > promo-code"
          ],
          "summary": "get-promo-code-by -promo code id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/update-promo-code/66b9eb6717df964badc14a19": {
        "put": {
          "tags": [
            "vendor > promo-code"
          ],
          "summary": "update promo code by promo code id",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "promo_code": "PR45T69",
                    "discount_type": "Absolute",
                    "discount": 18,
                    "description": "this is promo code testing api",
                    "active": true,
                    "promo_for": "Product",
                    "sub_category": "66b9e2b1940e38c10cd2c2ce",
                    "product": "66b33a73f32881f751864e21",
                    "is_validation_date": true,
                    "start_date": "2024-08-12",
                    "end_date": "2024-08-15",
                    "repeat": "Weekly",
                    "apply_offer_after_orders": 3,
                    "required_uses": 2,
                    "min_item_on_cart": 3,
                    "min_order_amount": 500,
                    "max_discount_amount": 50
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/delete-promo-code/66b9eb6717df964badc14a19": {
        "delete": {
          "tags": [
            "vendor > promo-code"
          ],
          "summary": "delete promo code by promo code id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/update-promo-code/66ba0911aa48f41481492bda": {
        "put": {
          "tags": [
            "vendor > promo-code"
          ],
          "summary": "update-promo-code by promo code id",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "promo_code": {
                      "type": "string",
                      "example": "PR45T61115MHINT"
                    },
                    "discount_type": {
                      "type": "string",
                      "example": "Percentage"
                    },
                    "discount": {
                      "type": "integer",
                      "example": "28"
                    },
                    "description": {
                      "type": "string",
                      "example": "this is promo code api testing2"
                    },
                    "active": {
                      "type": "boolean",
                      "example": "true"
                    },
                    "promo_for": {
                      "type": "string",
                      "example": "Store"
                    },
                    "sub_category": {
                      "type": "string",
                      "example": "66b084920eabd052caf13b9b"
                    },
                    "product": {
                      "type": "string",
                      "example": "66b33a73f32881f751864e21"
                    },
                    "is_validation_date": {
                      "type": "boolean",
                      "example": "true"
                    },
                    "start_date": {
                      "type": "string",
                      "example": "2024-08-12"
                    },
                    "end_date": {
                      "type": "string",
                      "example": "2024-08-15"
                    },
                    "repeat": {
                      "type": "string",
                      "example": "Weekly"
                    },
                    "apply_offer_after_orders": {
                      "type": "integer",
                      "example": "3"
                    },
                    "required_uses": {
                      "type": "integer",
                      "example": "2"
                    },
                    "min_item_on_cart": {
                      "type": "integer",
                      "example": "3"
                    },
                    "min_order_amount": {
                      "type": "integer",
                      "example": "2"
                    },
                    "max_discount_amount": {
                      "type": "integer",
                      "example": "50"
                    },
                    "image": {
                      "type": "string",
                      "format": "binary"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzMTg1NTkxLCJleHAiOjE3MjM4NzY3OTF9.fwUFoLNrbSnAXfrmyQ9yPhY2n5GhVjrAh1K5b3HLHQ8"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-all-customer-orders": {
        "get": {
          "tags": [
            "vendor > vendor-order"
          ],
          "summary": "get-all-orders",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzNjIyOTc1LCJleHAiOjE3MjQzMTQxNzV9.A9PwtXWngpY2iVJHLYwWueJTXxHDWkA7FYLYoU2_0fo"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/create-sale": {
        "post": {
          "tags": [
            "vendor > sales"
          ],
          "summary": "create sales",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "sale_name": {
                      "type": "string",
                      "example": "mansoon sales"
                    },
                    "discount_type": {
                      "type": "string",
                      "example": "Percentage"
                    },
                    "discount": {
                      "type": "integer",
                      "example": "10"
                    },
                    "description": {
                      "type": "string",
                      "example": "all electronics sale offer"
                    },
                    "active": {
                      "type": "boolean",
                      "example": "true"
                    },
                    "sale_for": {
                      "type": "string",
                      "example": "Category"
                    },
                    "category": {
                      "type": "string",
                      "example": "66b06eedb87d2cc514dffb12"
                    },
                    "sub_category": {
                      "type": "string",
                      "example": "66bb598c3225e7b040b4bf4c"
                    },
                    "product": {
                      "type": "string",
                      "example": "66bc4e17d59c675b8e136e7b"
                    },
                    "is_validation_date": {
                      "type": "boolean",
                      "description": "if it is true so start data and end date will work",
                      "example": "true"
                    },
                    "start_date": {
                      "type": "string",
                      "example": "08/16/2024 11:31 AM"
                    },
                    "end_date": {
                      "type": "string",
                      "example": "08/25/2024 11:31 AM"
                    },
                    "repeat": {
                      "type": "string",
                      "example": "Daily"
                    },
                    "min_order_amount": {
                      "type": "integer",
                      "example": "500"
                    },
                    "max_discount_amount": {
                      "type": "integer",
                      "example": "50"
                    },
                    "min_item_on_cart": {
                      "type": "integer",
                      "example": "0"
                    },
                    "image": {
                      "type": "string",
                      "format": "binary"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzODAwOTU2LCJleHAiOjE3MjQ0OTIxNTZ9.qd0ZMHwQIgtQbMw5TeW8Alx40GeFv_-JtNMxmxm43UA"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-sale-by-id/66bf3d7d2725de47aef0f304": {
        "get": {
          "tags": [
            "vendor > sales"
          ],
          "summary": "get sale by sale id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzODAwOTU2LCJleHAiOjE3MjQ0OTIxNTZ9.qd0ZMHwQIgtQbMw5TeW8Alx40GeFv_-JtNMxmxm43UA"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-all-sales": {
        "get": {
          "tags": [
            "vendor > sales"
          ],
          "summary": "get-all-sales",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzODAwOTU2LCJleHAiOjE3MjQ0OTIxNTZ9.qd0ZMHwQIgtQbMw5TeW8Alx40GeFv_-JtNMxmxm43UA"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/update-sale/66bf2fb2b794558ca10d7b79": {
        "put": {
          "tags": [
            "vendor > sales"
          ],
          "summary": "update sale",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "sale_name": {
                      "type": "string",
                      "example": "summer sales"
                    },
                    "discount_type": {
                      "type": "string",
                      "example": "Percentage"
                    },
                    "discount": {
                      "type": "integer",
                      "example": "10"
                    },
                    "description": {
                      "type": "string",
                      "example": "all electronics sale offer"
                    },
                    "active": {
                      "type": "boolean",
                      "example": "true"
                    },
                    "sale_for": {
                      "type": "string",
                      "example": "Store"
                    },
                    "category": {
                      "type": "string",
                      "example": "66b06eedb87d2cc514dffb12"
                    },
                    "sub_category": {
                      "type": "string",
                      "example": "66bb598c3225e7b040b4bf4c"
                    },
                    "product": {
                      "type": "string",
                      "example": "66bc4e17d59c675b8e136e7b"
                    },
                    "is_validation_date": {
                      "type": "boolean",
                      "description": "if it is true so start data and end date will work",
                      "example": "true"
                    },
                    "start_date": {
                      "type": "string",
                      "example": "08/16/2024 11:31 AM"
                    },
                    "end_date": {
                      "type": "string",
                      "example": "08/25/2024 11:31 AM"
                    },
                    "repeat": {
                      "type": "string",
                      "example": "Daily"
                    },
                    "min_order_amount": {
                      "type": "integer",
                      "example": "500"
                    },
                    "max_discount_amount": {
                      "type": "integer",
                      "example": "50"
                    },
                    "min_item_on_cart": {
                      "type": "integer",
                      "example": "0"
                    },
                    "image": {
                      "type": "string",
                      "format": "binary"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzODAwOTU2LCJleHAiOjE3MjQ0OTIxNTZ9.qd0ZMHwQIgtQbMw5TeW8Alx40GeFv_-JtNMxmxm43UA"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/delete-sale/66bf2fb2b794558ca10d7b79": {
        "delete": {
          "tags": [
            "vendor > sales"
          ],
          "summary": "delete sale by sale id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJiYWxhamkgYWFkaSIsImxhc3RfbmFtZSI6bnVsbCwicGhvbmVfbnVtYmVyIjoiOTE1NDY2NTc0NTY0IiwiaWF0IjoxNzIzODAwOTU2LCJleHAiOjE3MjQ0OTIxNTZ9.qd0ZMHwQIgtQbMw5TeW8Alx40GeFv_-JtNMxmxm43UA"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/create-product-variant": {
        "post": {
          "tags": [
            "vendor > product varient"
          ],
          "summary": "create product varient",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "product": {
                      "type": "string",
                      "example": "66ebef77b338b6e46e823cd2"
                    },
                    "name": {
                      "type": "string",
                      "example": "full sleev shirts with stripers"
                    },
                    "is_visible": {
                      "type": "boolean",
                      "example": "true"
                    },
                    "product_color": {
                      "type": "string",
                      "example": "red,blue,green"
                    },
                    "product_size": {
                      "type": "string",
                      "example": "L"
                    },
                    "description": {
                      "type": "string",
                      "example": "This is a sample product"
                    },
                    "specification": {
                      "type": "string",
                      "example": "No specifications"
                    },
                    "additional_info": {
                      "type": "string",
                      "example": "No Additional info Available"
                    },
                    "mrp_price": {
                      "type": "integer",
                      "example": "400"
                    },
                    "sales_price": {
                      "type": "integer",
                      "example": "350"
                    },
                    "stock": {
                      "type": "integer",
                      "example": "90"
                    },
                    "primary_image": {
                      "type": "string",
                      "format": "binary"
                    },
                    "secondary_image": {
                      "type": "string",
                      "format": "binary"
                    },
                    "serial_number": {
                      "type": "string",
                      "example": "MSFS45"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJNeSBTaG9wIiwibGFzdF9uYW1lIjpudWxsLCJwaG9uZV9udW1iZXIiOiI5MTU0NjY1NzQ1NjQiLCJpYXQiOjE3MjY3MjMxMDIsImV4cCI6MTcyODAxOTEwMn0.eAnNm3tEJExcJk3Z6W_xb03FALd81rPs_pLlqFll2Rc"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-product-variant/66f50f0d1ed5932de74a549a": {
        "get": {
          "tags": [
            "vendor > product varient"
          ],
          "summary": "get product varient by product varient id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJNeSBTaG9wIiwibGFzdF9uYW1lIjpudWxsLCJwaG9uZV9udW1iZXIiOiI5MTU0NjY1NzQ1NjQiLCJpYXQiOjE3MjY3MjMxMDIsImV4cCI6MTcyODAxOTEwMn0.eAnNm3tEJExcJk3Z6W_xb03FALd81rPs_pLlqFll2Rc"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-all-product-variant/66f5398563d9552f34352345": {
        "get": {
          "tags": [
            "vendor > product varient"
          ],
          "summary": "get all product varients by product id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJNeSBTaG9wIiwibGFzdF9uYW1lIjpudWxsLCJwaG9uZV9udW1iZXIiOiI5MTU0NjY1NzQ1NjQiLCJpYXQiOjE3MjY3MjMxMDIsImV4cCI6MTcyODAxOTEwMn0.eAnNm3tEJExcJk3Z6W_xb03FALd81rPs_pLlqFll2Rc"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/update-product-variant/66f50f0d1ed5932de74a549a": {
        "put": {
          "tags": [
            "vendor > product varient"
          ],
          "summary": "update product varient by varient id",
          "requestBody": {
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "product": {
                      "type": "string",
                      "example": "66f5398563d9552f34352345"
                    },
                    "name": {
                      "type": "string",
                      "example": "Samsung Galaxy Watch3 Bluetooth(4.0 cm, Black Green, Compatible with Android only)"
                    },
                    "is_visible": {
                      "type": "boolean",
                      "example": "true"
                    },
                    "product_color": {
                      "type": "string",
                      "description": "here only one color will send",
                      "example": "red"
                    },
                    "description": {
                      "type": "string",
                      "example": "This is a sample product"
                    },
                    "specification": {
                      "type": "string",
                      "example": "Sample specification"
                    },
                    "additional_info": {
                      "type": "string",
                      "example": "Additional info"
                    },
                    "primary_image": {
                      "type": "string",
                      "format": "binary"
                    },
                    "secondary_image": {
                      "type": "string",
                      "format": "binary"
                    },
                    "serial_number": {
                      "type": "string",
                      "example": "wm456s"
                    },
                    "product_details[0][product_size]": {
                      "type": "integer",
                      "example": "6"
                    },
                    "product_details[0][mrp_price]": {
                      "type": "integer",
                      "example": "2000"
                    },
                    "product_details[0][sales_price]": {
                      "type": "integer",
                      "example": "1650"
                    },
                    "product_details[0][stock]": {
                      "type": "integer",
                      "example": "2"
                    },
                    "product_details[0][product_width]": {
                      "type": "integer",
                      "example": "2"
                    },
                    "product_details[0][product_height]": {
                      "type": "integer",
                      "example": "1"
                    },
                    "product_details[0][product_depth]": {
                      "type": "integer",
                      "example": "1"
                    },
                    "product_details[0][product_weight]": {
                      "type": "integer",
                      "example": "10"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJNeSBTaG9wIiwibGFzdF9uYW1lIjpudWxsLCJwaG9uZV9udW1iZXIiOiI5MTU0NjY1NzQ1NjQiLCJpYXQiOjE3MjY3MjMxMDIsImV4cCI6MTcyODAxOTEwMn0.eAnNm3tEJExcJk3Z6W_xb03FALd81rPs_pLlqFll2Rc"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-dashboard-data": {
        "get": {
          "tags": [
            "vendor > dashboard"
          ],
          "summary": "vendor dashboard data",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJNeSBTaG9wIiwibGFzdF9uYW1lIjpudWxsLCJwaG9uZV9udW1iZXIiOiI5MTU0NjY1NzQ1NjQiLCJpYXQiOjE3Mjc2OTA0OTYsImV4cCI6MTcyODk4NjQ5Nn0.VCFLQN2hY94ey7ISRHlNhm-esohLYWzUAP-YTCMlcOc"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/vendor/get-order-analytics": {
        "post": {
          "tags": [
            "vendor > dashboard"
          ],
          "summary": "get order analytics",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "filter": {
                      "startDate": "2024-09-01",
                      "endDate": "2024-09-07"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFhMGI1YWYwNjE2MGE2ZTMzMjk3NWIiLCJlbWFpbCI6ImJhbGFqaWFhZGUyMDAwQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJNeSBTaG9wIiwibGFzdF9uYW1lIjpudWxsLCJwaG9uZV9udW1iZXIiOiI5MTU0NjY1NzQ1NjQiLCJpYXQiOjE3Mjc2OTA0OTYsImV4cCI6MTcyODk4NjQ5Nn0.VCFLQN2hY94ey7ISRHlNhm-esohLYWzUAP-YTCMlcOc"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/auth/login/2": {
        "post": {
          "tags": [
            "All user Login"
          ],
          "summary": "vendor login",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "emailOrPhone": "balajiaade2000@gmail.com",
                    "password": "India@123"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/auth/login/4": {
        "post": {
          "tags": [
            "All user Login"
          ],
          "summary": "customer login",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "emailOrPhone": "customer@gmail.com",
                    "password": "India@1234"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/auth/login/1": {
        "post": {
          "tags": [
            "All user Login"
          ],
          "summary": "admin login",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "emailOrPhone": "admin@gmail.com",
                    "password": "India@123"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/admin/get-all-users/2": {
        "post": {
          "tags": [
            "admin > user"
          ],
          "summary": "get-all-users",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "page": 1,
                    "limit": 11,
                    "sortOrder": "desc"
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjQzOTg4NzIsImV4cCI6MTcyNTA5MDA3Mn0.F5xIGX87-XqOcWay-CKRH5-acLWqES80MTlpIvJRKrg"
            },
            {
              "name": "search",
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/admin/create-setting": {
        "post": {
          "tags": [
            "admin > settings"
          ],
          "summary": "create setting",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "currency": "INR",
                    "enterSign": 1,
                    "autoTransferDayForDeliveryman": true,
                    "autoTransferDayForStore": false,
                    "stripeAmount": 100,
                    "business": true,
                    "distanceUnitInMile": true,
                    "showAds": false,
                    "sendMoneyForUser": true,
                    "sendMoneyForProvider": false,
                    "referralForUser": true,
                    "userCodeLimit": 10,
                    "bonusToUser": 5,
                    "bonusToUserFriend": 3,
                    "referralForDeliveryman": true,
                    "deliverymanCodeLimit": 90,
                    "bonusToDeliveryman": 4,
                    "bonusToDeliverymanFriend": 2,
                    "referralForStore": true,
                    "storeCodeLimit": 20,
                    "bonusToStore": 6,
                    "country": "66cd6e58bb9a967736a7f6e4"
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjcyNTM4NzQsImV4cCI6MTcyODU0OTg3NH0.AhZ5S5X9OrLISsZigK1JZobSe-BhLnIpawitllEs8Yw"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/admin/get-all-settings": {
        "get": {
          "tags": [
            "admin > settings"
          ],
          "summary": "get all setttings ",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjcyNTM4NzQsImV4cCI6MTcyODU0OTg3NH0.AhZ5S5X9OrLISsZigK1JZobSe-BhLnIpawitllEs8Yw"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/admin/update-setting/66f3ff3880dddcb8b4aa2276": {
        "put": {
          "tags": [
            "admin > settings"
          ],
          "summary": "update-setting",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "currency": "INR",
                    "enterSign": 2,
                    "autoTransferDayForDeliveryman": true,
                    "autoTransferDayForStore": false,
                    "stripeAmount": 500,
                    "business": true,
                    "distanceUnitInMile": true,
                    "showAds": false,
                    "sendMoneyForUser": true,
                    "sendMoneyForProvider": false,
                    "referralForUser": true,
                    "userCodeLimit": 10,
                    "bonusToUser": 5,
                    "bonusToUserFriend": 3,
                    "referralForDeliveryman": true,
                    "deliverymanCodeLimit": 150,
                    "bonusToDeliveryman": 40,
                    "bonusToDeliverymanFriend": 20,
                    "referralForStore": true,
                    "storeCodeLimit": 20,
                    "bonusToStore": 60,
                    "country": "66cd6e58bb9a967736a7f6e6"
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjcyNTM4NzQsImV4cCI6MTcyODU0OTg3NH0.AhZ5S5X9OrLISsZigK1JZobSe-BhLnIpawitllEs8Yw"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/admin/get-setting-by-id/66f3ff3880dddcb8b4aa2276": {
        "get": {
          "tags": [
            "admin > settings"
          ],
          "summary": "get setting by setting id",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjcyNTM4NzQsImV4cCI6MTcyODU0OTg3NH0.AhZ5S5X9OrLISsZigK1JZobSe-BhLnIpawitllEs8Yw"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/admin/delete-settings/66f3d972179eeaa29c91f5f3": {
        "delete": {
          "tags": [
            "admin > settings"
          ],
          "summary": "delete setting",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjcyNTM4NzQsImV4cCI6MTcyODU0OTg3NH0.AhZ5S5X9OrLISsZigK1JZobSe-BhLnIpawitllEs8Yw"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/admin/get-dasboard-data": {
        "get": {
          "tags": [
            "admin"
          ],
          "summary": "get-dasboard-data",
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjY2NDU0NDIsImV4cCI6MTcyNzk0MTQ0Mn0.xRzRXHKL8gva8OGrCkX7Kh_QhKspDoUe0ijvWWLn6Zk"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/admin/get-order-analytics": {
        "post": {
          "tags": [
            "admin"
          ],
          "summary": "get grpah data by date wise",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "startDate": "2024-09-01",
                    "endDate": "2024-09-07"
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjY2NDU0NDIsImV4cCI6MTcyNzk0MTQ0Mn0.xRzRXHKL8gva8OGrCkX7Kh_QhKspDoUe0ijvWWLn6Zk"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/admin/get-all-promocodes": {
        "post": {
          "tags": [
            "admin"
          ],
          "summary": "get-all-promocodes",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "page": 1,
                    "limit": 20,
                    "sortOrder": -1
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjY2NDU0NDIsImV4cCI6MTcyNzk0MTQ0Mn0.xRzRXHKL8gva8OGrCkX7Kh_QhKspDoUe0ijvWWLn6Zk"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },
      "/api/v1/admin/get-all-sales": {
        "post": {
          "tags": [
            "admin"
          ],
          "summary": "get-all-sales",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "example": {
                    "page": 1,
                    "limit": 20,
                    "sortOrder": -1
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "Authorization",
              "in": "header",
              "schema": {
                "type": "string"
              },
              "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE4Y2I4NjMwOGI5ZWIxYmM4ZWIyNjIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJhZG1pbiIsImxhc3RfbmFtZSI6InVzZXIiLCJwaG9uZV9udW1iZXIiOiI5MTk2OTEwNjA3NDciLCJpYXQiOjE3MjY2NDU0NDIsImV4cCI6MTcyNzk0MTQ0Mn0.xRzRXHKL8gva8OGrCkX7Kh_QhKspDoUe0ijvWWLn6Zk"
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response",
              "content": {
                "application/json": {}
              }
            }
          }
        }
      },

    }

  },
  apis: ['./routes/*.js', './models/*.js'], 
};
