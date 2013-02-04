module.exports = Game;

function Game(id, name) {
    this.id = id;
    this.name = name;
    this.dealer = {};
    this.players = {};
    this.stories = {};
    this.deck = [1, 2, 3, 5, 8, 13, 20];
}

function Story(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.points;
}

/**
 * Add a player to a game. Player name must be unique
 *
 * @param {String} name of player
 * @param {String} email address of player
 * @param {Boolean} true if the player is the game's dealer
 * @return {Object} player object
 */
Game.prototype.addPlayer = function(name, email, isDealer) {
    var player = {name: name, email: email};
    this.players[name] = player;
    if (isDealer)
        this.dealer = player;
    return player;
}

/**
 * Removes a player from the game. The dealer cannot be removed from the game.
 *
 * @param {String} name of the player to remove
 * @return {Boolean} true if the player was removed
 */
Game.prototype.removePlayer = function(name) {
    if (this.dealer !== name)
        return delete this.players[name];
    return false;
}

/**
 * Adds a story for estimation.
 *
 * @param {String} a short name for the story
 * @param {String} a longer description of the story (optional)
 * @param {String} the story id (optional)
 */
Game.prototype.addStory = function(name, description, id) {
    id = id || name;
    this.stories[id] = new Story(id, name, description);
}

