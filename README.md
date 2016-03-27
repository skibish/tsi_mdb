# TSI Modern Databases Work

## Intro

### How to run?

Install [Docker](https://www.docker.com/) or [Docker Toolbox](https://www.docker.com/products/docker-toolbox) (if you are on Win or Mac).

Start *Docker Quick Start Terminal*

Clone project

```bash

$ git clone git@github.com:skibish/tsi_mdb.git

```

Go into directory

```bash
$ cd tsi_mdb
```

Run

```bash
$ docker-compose up -d
```

App will be available on `<docker-machine ip>:9000`.

### Populate Mongo

To populate database with some data, run:

```bash
$ docker exec tsimdb_server_1 node generator.js
```

This will create 100 movies, auditories, sessions and 3 price types.
