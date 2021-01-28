**Usage**

`docker-compose up` in root folder will launch all ecosystem even with some saved PostgreSQL data. 
[127.0.0.1] in browser will load main page.

You can use `admin/admin` to authenticate. Registaration are simplified so as not to use and configure mailer. Authentication works with `Authorization` header containing API token. Guest users can not create new articles and see unpublished ones. Authenticated users can create new articles, edit their ones and see unpublished their ones in the list.

---

**API**

Base URL: /api/v1

| Endpoint                | Method       | Request Body                     | Response Body               | Description                                      | Errors |
|:------------------------|:-------------|:---------------------------------|:----------------------------|:-------------------------------------------------|-----|
| /user?token={api_token} | GET          |                                  | User                        | Get user info by API token saved in localStorage | 401 |
| /user                   | PUT          | {name: string, password: string} |                             | Register new user                                |     |
| /user                   | POST         | {name: string, password: string} | {token: string, user: User} | Login existing user                              | 401 |
| /article?page={page}    | GET          |                                  | [...ArticleInfo]            | Get paginated list of simplifired articles info  |     |
| /article                | POST         | Article                          | id: number                  | Create new article and return the resulting ID   | 401 |
| /article/<id>           | GET          |                                  | Article                     | Get article by given ID                          | 401 |
| /article/<id>           | PATCH        | Article                          |                             | Update article by given ID with given data       | 401 |
| /article/<id>           | DELETE       |                                  |                             | Delete article by given ID                       | 401 |
  
---
  
**Technologies**

- Laravel 8.24.0
- Vue.js 2.6.12
- Tailwind CSS 2.0.2
