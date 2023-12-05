# Todo List API

Ini adalah backend untuk aplikasi Todo List.

## Deskripsi

Backend ini menyediakan endpoint-endpoint untuk manajemen todo list.

## Penggunaan

### Endpoint

Base URL: `https://todo-api-v2.cyclic.app/`

#### Authentication

- Endpoint: `/api/v1/users/register`
  - Method: `POST`
  - Deskripsi: Endpoint untuk register pengguna baru.
  - Request Body:
    ```json
    {
      "username": "user",
      "password": "password",
      "email" : "email",
      "firstName" : "firstName",
      "lastName" : "lastName"
    }
    ```
  - Response:
    ```json
    {
        "message": "Successfully created user data!",
        "statusCode" : "200"
    }
    ```

- Endpoint: `/api/v1/users/login`
  - Method: `POST`
  - Deskripsi: Endpoint untuk login pengguna.
  - Request Body:
    ```json
    {
      "username": "user",
      "password": "password"
    }
    ```
  - Response:
    ```json
    {
      "access_token": "your_access_token"
    }
    ```

### CRUD TODO
- Endpoint: `/api/v1/todo`
  - Method: `POST`
  - Deskripsi: Endpoint untuk membuat todo.
  - Request Body:
    ```json
    {
      "title": "title",
      "completed": "completed",
      "dueDate" : "date"

    }
    ```
  - Response:
    ```json
    {
        "message": "message",
        "todo": {
            "title": "title",
            "completed": false,
            "dueDate": "date",
            "user": "user_id",
            "_id": "todoId",
            "createdAt": "date",
            "updatedAt": "date"
            }
    }
    ```


### Menjalankan Aplikasi

Untuk menjalankan aplikasi secara lokal, ikuti langkah-langkah berikut:

1. Salin repositori ini.
2. Instal dependensi dengan perintah `npm install`.
3. Konfigurasi variabel lingkungan yang diperlukan seperti database URL, dll.
4. Jalankan aplikasi dengan perintah `npm run dev`.


