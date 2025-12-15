#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  husky_skip_init=1
  debug () {
    if [ "$HUSKY_DEBUG" = "1" ]; then
      echo "husky (debug) - $1"
    fi
  }
  debug "starting $0..."
  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi
  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi
  export husky_skip_init
  sh -e "$0" "$@"
  exit $?
fi
