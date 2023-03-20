### Hexlet tests and linter status:
[![Actions Status](https://github.com/domingi/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/domingi/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/bcca637a06e1791ccf6e/maintainability)](https://codeclimate.com/github/domingi/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bcca637a06e1791ccf6e/test_coverage)](https://codeclimate.com/github/domingi/frontend-project-46/test_coverage)
![Actions run-tests status](https://github.com/domingi/frontend-project-46/actions/workflows/run-tests.yml/badge.svg)


# genDiff

## About
Generate diff between two files.

Supported file formats:
- JSON
- YAML

## Installation
```shell
npm install github:domingi/frontend-project-46
```

## Usage

### CLI
The basic interface is:
```shell
gendiff filepath1 filepath2
```
JSON format
[![asciicast](https://asciinema.org/a/k355AIGo3A55jwvnKgkY3BGex.svg)](https://asciinema.org/a/0wuE2f5fz8GKg3DvVlNpbc0bu)

YAML format
[![asciicast](https://asciinema.org/a/k355AIGo3A55jwvnKgkY3BGex.svg)](https://asciinema.org/a/1wSKYoetm4GXFW5nKWTnh8P1D)

Change format
You can choose other format of result diff with option `--type`:
- `plain` to show plain diff
- `json` to show json string
```shell
gendiff filepath1 filepath2 --type plain
```
[![asciicast](https://asciinema.org/a/k355AIGo3A55jwvnKgkY3BGex.svg)](https://asciinema.org/a/owdIwgAwbvc24k3FalJyWzE71)
[![asciicast](https://asciinema.org/a/k355AIGo3A55jwvnKgkY3BGex.svg)](https://asciinema.org/a/LBpfk42IPuraaRboglG8g75Dt)

### ES6
```js
const diff = genDiff(filepath1, filepath2, [formatName]);
```
