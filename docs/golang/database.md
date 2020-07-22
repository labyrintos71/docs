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

--현재 Postgresql DB의 계정 및 Role 권한 정보를 확인할 수 있다.
\du

--role에 부여된 스키마 권한을 확인할 수 있다.
\z
```

role 생성하기
```sql
CREATE ROLE name [ [ WITH ] option [ ... ] ]
```

role 삭제하기
```sql
DROP ROLE <role name>;
//삭제할 Role이 없을 경우 오류를 피할수 있다.
DROP ROLE IF EXISTS <role name>;
```

admin 이름으로 `LOGIN`, `CREATEDB` 권한을 추가해준다.  
```sql
CREATE ROLE admin WITH LOGIN CREATEDB PASSWORD 'C18H27NO3';
```
`role`에 관한 자세한 정보는 [create role](https://www.postgresql.org/docs/12/sql-createrole.html)에서 확인 가능하다. 

<!-- GRANT REVOKE -->
### User 확인 및 생성
user 정보 불러오기
```sql
SELECT * FROM pg_user;
```

user 생성하기
```sql
CREATE USER name [ [ WITH ] option [ ... ] ]
```
```sql
CREATE USER master_user WITH PASSWORD 'password' ROLE admin;
CREATE USER master_user WITH PASSWORD 'C18H27NO3' ROLE admin;
```
`user`에 관한 자세한 정보는 [create user](https://www.postgresql.org/docs/12/sql-createuser.html)에서 확인 가능하다. 


<!-- 
tableplus

C18H27NO3
```go
go mod init
go get github.com/go-pg/pg/v10
go get github.com/dizzyfool/genna
https://browndwarf.tistory.com/3
https://idenrai.tistory.com/224
https://bono915.tistory.com/entry/Postgresql-DB-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%B6%94%EA%B0%80-%EB%B0%8F-Role-%EA%B6%8C%ED%95%9C-%EA%B4%80%EB%A6%AC

특정 테이블에 권한을 부여할 경우

GRANT UPDATE, SELECT ON <table name> TO <role name>;
1
GRANT UPDATE, SELECT ON <table name> TO <role name>;
모든 권한을 주고싶은 경우

GRANT ALL ON <table name> TO <role name>;
1
GRANT ALL ON <table name> TO <role name>;
모든 Role에 대해서 권한을 부여할 경우

GRANT INSERT ON <table name> TO PUBLIC;
1
GRANT INSERT ON <table name> TO PUBLIC;
데이터베이스에 모든 권한을 부여할 경우

GRANT ALL ON DATABASE <database name> TO <role name>;
1
GRANT ALL ON DATABASE <database name> TO <role name>;
권한을 수정한 다음엔 다음 명령으로 접근 권한을 확인해 볼 수 있다

\z
1
\z
Role에 권한 삭제
“REVOKE”명령으로 권한을 삭제한다.

REVOKE INSERT ON <table name> FROM <role name>;
1
REVOKE INSERT ON <table name> FROM <role name>;
``` -->
