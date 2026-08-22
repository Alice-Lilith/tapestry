.DEFAULT_GOAL := help
PNPM := pnpm

help: ## list targets
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN{FS=":.*?## "}{printf "  %-14s %s\n", $$1, $$2}'

install: ## pnpm install, only when the lockfile changed
	@$(PNPM) install --frozen-lockfile 2>/dev/null || $(PNPM) install

check: typecheck lint test ## everything CI would run

typecheck: ## tsc --noEmit
	$(PNPM) exec tsc

lint: ## oxlint
	$(PNPM) exec oxlint

format: ## oxfmt --write
	$(PNPM) exec oxfmt --write

test: ## vitest once
	$(PNPM) exec vitest run

test-watch: ## vitest in watch mode
	$(PNPM) exec vitest

.PHONY: help install check typecheck lint format test test-watch
