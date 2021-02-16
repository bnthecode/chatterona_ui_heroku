// project revolves around 3 data types
// servers, channels, messages

// a server contains channels
// a channel contains messages

// you log in and you set your cookie, along with base info of your user like id, username, photoURL

// when making a request to get all servers, you pass your cookie to chatterona_ui_api
// and this cookie is parsed to build your user which is then used to query servers for which your associated to
// you then get back a list of servers that are minified by chatterona_ui_api parsers
// these parsers take each location and strucyre the parser to give each location a friendly object.

// for instance, a ui server list should only contain and id, name, and photoURL
// then when you make a request for that server you grab its channelIds / other data.

// to be continued