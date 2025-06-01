
---

## 📸 2. Screenshot Steps for Postman

### A. Setup
- Start your server: `node app.js`
- Open Postman
- Import the collection `.json`

---

### B. Screenshot Each Task

| Step | Action | Screenshot What |
|------|--------|-----------------|
| 1 | `GET /books` | Full list of books |
| 2 | `GET /books/isbn/123456` | Response with matching book |
| 3 | `GET /books/author/Tolkien` | Filtered author match |
| 4 | `GET /books/title/Rings` | Filtered title match |
| 5 | `GET /books/review/123456` | Empty or populated reviews |
| 6 | `POST /auth/register` | JSON body & success response |
| 7 | `POST /auth/login` | JWT token in response |
| 8 | `PUT /books/review/123456` | Add/update with token |
| 9 | `DELETE /books/review/123456` | Confirm deletion |
| 10 | Try `PUT/DELETE` without token | Show 401 Unauthorized error |

---

### C. Authenticated Routes – Add Token
- Copy token from login response
- Go to Headers tab
- Add:
