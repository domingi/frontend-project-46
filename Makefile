#Makefile
lint: # запуск линтера ESlint
		npx eslint .

test: # запуск тестов Jest
		NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage: # проверка покрытия кода тестами
		NODE_OPTIONS=--experimental-vm-modules npx jest --coverage