source /root/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh

PROMPT='web» '

alias run="node ."
alias dev='./node_modules/.bin/webpack --config ./webpack.dll.js --bail --hide-modules && \
	./node_modules/.bin/nodemon \
		--config ./nodemon.json \
		-e js,html,css \
		--quiet \
		--watch ./ \
		--delay 250ms \
		-x "./node_modules/.bin/webpack --config ./webpack.config.js --bail --hide-modules && node ."'
alias test="./node_modules/.bin/standard && ./node_modules/.bin/mocha --recursive test"
alias tdd='./node_modules/.bin/nodemon \
	--quiet \
	--watch ./ \
	--delay 250ms \
	-x "./node_modules/.bin/standard && ./node_modules/.bin/mocha --recursive test || exit 1"'

alias ll="ls -la"
alias d="docker"
alias dm="docker-machine"
alias ds="docker-swarm"
alias dco="docker-compose"

# changes hex 0x15 to delete everything to the left of the cursor,
# rather than the whole line
bindkey "^U" backward-kill-line

# binds hex 0x18 0x7f with deleting everything to the left of the cursor
bindkey "^X\\x7f" backward-kill-line

# adds redo
bindkey "^X^_" redo

# history substring search
zle -N history-substring-search-up
zle -N history-substring-search-down
bindkey "^[OA" history-substring-search-up
bindkey "^[OB" history-substring-search-down

source /root/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /root/.zsh/zsh-history-substring-search/zsh-history-substring-search.zsh
