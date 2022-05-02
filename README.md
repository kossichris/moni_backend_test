
## Moni backend test

Moni backend test is built using [Nest](https://github.com/nestjs/nest) a tyescript framework for building efficient, scalable Node.js server-side applications.

## Installation
If you want to run run that project on your local machine
```bash
$ install postgres on your machine
```
- Go to Postgres shell and Create a moni Database
```bash
$ create database moni;
```
```bash
$ create user moni with encrypted password '123';
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start

# production mode
$ yarn run start:prod
```

## Authentication Api

# POST /users
$ curl http://localhost:3000/users

```bash
{

	"user":{
		"username": "chrismal",
		"email": "chris@gmail.com",
		"password": "123"
	}
}
```

# POST /users/login
$ curl http://localhost:3000/users/login

```bash
{

	"user":{
		"username": "chrismal",
		"email": "chris@gmail.com",
		"password": "123"
	}
}
```


# Create a wallet: POST /wallet
$ curl http://localhost:3000/wallet

```bash
{

	"wallet":{
		"name": "monWallet",
		"balance": 1000
	}
}
```

# Fund a wallet: POST /wallet/fund
$ curl http://localhost:3000/wallet/fund

```bash
{

	"wallet":{
		"name": "monWallette",
		"balance": 2000
	}
}
```

# Transfer funds to a wallet: POST /wallet/userId/transfer
$ curl http://localhost:3000/wallet/1/transfer

```bash
{

	"wallet":{
		"amount": 20000
	}
}
```

## License

Nest is [MIT licensed](LICENSE).
