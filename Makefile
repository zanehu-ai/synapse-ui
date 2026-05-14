.PHONY: typecheck clean

typecheck:
	npx tsc --noEmit

clean:
	rm -rf dist/ *.tsbuildinfo
