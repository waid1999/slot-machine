window.game = window.game || {};
(function() {
    /**
     * The reels for the game
     * @class game.Reels
     * @param {PXII.Texture[]} symbolTextures The available symbols
     * @constructor
     */
    var Reels = function(symbolTextures)
    {
        PIXI.Container.call(this);
        
        // Create the signals
        this.spinBeganSignal = new signals.Signal();
        this.spinCompleteSignal = new signals.Signal();

        // Store the symbol textures
        this._symbolTextures = symbolTextures;
        this.reels = [];
        this.isRunning = false

        this.setupReels()
    };

    var p = Reels.prototype = Object.create(PIXI.Container.prototype);
    p.constructor = Reels;

    /**
     * Dispatched when the spin has began
     * @type {signals.Signal}
     * @event spinBeganSignal
     */
    p.spinBeganSignal = null;

    /**
     * Dispatched when the spin has completed
     * @type {signals.Signal}
     * @event spinCompleteSignal
     */
    p.spinCompleteSignal = null;

    /**
     * The states of the button
     * @type {object}
     * @private
     */
    p._symbolTextures = null;

    p.setupReels = function()
    {
        const REEL_WIDTH = 340;
        const SYMBOL_SIZE = 318;
        // Build the reels
        const reels = [];
        const reelContainer = new PIXI.Container();
        for (let i = 0; i < 4; i++) {
            const rc = new PIXI.Container();
            rc.x = i * REEL_WIDTH;
            reelContainer.addChild(rc);
    
            const reel = {
                container: rc,
                symbols: [],
            };
    
            // Build the symbols
            for (let j = 0; j < 9; j++) {
                const symbol = new PIXI.Sprite(this._symbolTextures[j]) //new PIXI.Sprite(this._symbolTextures[Math.floor(Math.random() * this._symbolTextures.length)]);
                // Scale the symbol to fit symbol area.
                symbol.y = j * SYMBOL_SIZE;
                symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
                symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
                reel.symbols.push(symbol);
                rc.addChild(symbol);
            }
            reels.push(reel);
        }

        reelContainer.x = 130;
        this.reels = reels;
        this.addChild(reelContainer);
    };

    /**
     * Start the reel spin
     */

    p.startSpin = function()
    {    
        var randomValue = [R(2,5), R(2,5), R(2,5), R(3, 5)]
        for(let i = 0, delay = 0; i < this.reels.length; i++){
            TweenMax.to(this.reels[i].container , 1.5 ,{
                y: -318 * randomValue[i],
                ease: Bounce.easeOut,
                delay: delay}); 
            delay += 0.1;
        }
            

        function R(min,max) {
            return Math.floor(Math.random() * (max - min) + min);
        };

    };

    /**
     * Stop the reel spin
     */
    p.stopSpin = function()
    {
    };

    window.game.Reels = Reels;

})();