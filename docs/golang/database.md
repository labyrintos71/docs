# GOPG + DB CRUD

## Postgres 
[PostgreSQL](https://www.postgresql.org/은 오픈소스 객체-관계형 데이터베이스 시스템(ORDBMS)으로 뛰어난 성능을 자랑한다. 다른 관계형 데이터베이스 시스템과 달리 연산자, 복합 자료형, 집계 함수, 자료형 변환자, 확장 기능 등 다양한 데이터베이스 객체를 사용자가 임의로 만들 수 있는 기능을 제공함으로써 마치 새로운 하나의 프로그래밍 언어처럼 무한한 기능을 손쉽게 구현할 수 있다.

### 설치하기 
1. [Postgres 다운로드](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) 에서 운영체제에 맞게 다운로드를 받는다.
2. 비밀번호 설정은 superuser(postgres)계정에 대한 비밀번호다.
3. port 는 default가 5432기 때문에 그대로 두는게 좋다.
4. locale을 설정해주는 부분은 Korean, Korea를 선택해주자.

GUI툴은 pgAdmin4 대신 [TablePlus](https://tableplus.com/windows)를 추천한다.  
설치가 완료 되었으면 SQL SHELL(psql)

### Role 권한 확인 및 Role 추가
Role 정보 불러오기
```sql
SELECT * FROM pg_roles;
```

role 생성하기
```sql
CREATE ROLE name [ [ WITH ] option [ ... ] ]
```

admin 이름으로 `LOGIN`, `CREATEDB` 권한을 추가해준다.  
```sql
CREATE ROLE admin WITH LOGIN CREATEDB;
```
`role`에 관한 자세한 정보는 [create role](https://www.postgresql.org/docs/12/sql-createrole.html)에서 확인 가능하다. 

### User 확인 및 생성
user 정보 불러오기
```sql
SELECT * FROM pg_user
```

`user`에 관한 자세한 정보는 [create user](https://www.postgresql.org/docs/12/app-createuser.html)에서 확인 가능하다. 


<!-- 
tableplus


```go
go mod init
go get github.com/go-pg/pg/v10
go get github.com/dizzyfool/genna
``` -->
