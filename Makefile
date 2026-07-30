docker-up: 
	docker compose up -d

docker-down:
	docker compose down

code-back: 
	code ./sites/atelier-horizon-back

code-front:
	code ./sites/atelier-horizon-front

up-back:
	npm run dev --prefix sites/atelier-horizon-back

up-front:
	npm run dev --prefix sites/atelier-horizon-front

up:
	$(MAKE) docker-up
	$(MAKE) code-front
	npm run dev
	
down: 
	$(MAKE) docker-down

restart:
	$(MAKE) down
	$(MAKE) up