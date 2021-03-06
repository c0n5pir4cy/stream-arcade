import 'p2';
import 'pixi';
import 'phaser';

import * as WebFontLoader from 'webfontloader';

import Boot from './states/boot';
import Preloader from './states/preloader';
import Title from './states/title';
import FlappyTitle from './states/flappy-scrangle/title';
import FlappyStory from './states/flappy-scrangle/story';
import FlappyScrangle from './states/flappy-scrangle/flappyScrangle';
import FlappyNameInput from './states/flappy-scrangle/nameInput';
import FlappyScoreboard from './states/flappy-scrangle/scores';
import SimInvaders from './states/sim-invaders/simInvaders';
import SimInvadersTitle from './states/sim-invaders/title';
import SimInvadersScoreboard from './states/sim-invaders/scores';
import SimInvadersNameInput from './states/sim-invaders/nameInput';
import * as Utils from './utils/utils';
import * as Assets from './assets';

class App extends Phaser.Game {
    constructor(config: Phaser.IGameConfig) {
        super (config);

        this.state.add('boot', Boot);
        this.state.add('preloader', Preloader);
        this.state.add('title', Title);
        this.state.add('flappyTitle', FlappyTitle);
        this.state.add('flappyStory', FlappyStory);
        this.state.add('flappyScrangle', FlappyScrangle);
        this.state.add('simInvaders', SimInvaders);
        this.state.add('simInvadersTitle', SimInvadersTitle);
        this.state.add('simInvadersScoreboard', SimInvadersScoreboard);
        this.state.add('simInvadersNameInput', SimInvadersNameInput);

        this.state.add('flappyScoreboard', FlappyScoreboard);
        this.state.add('flappyNameInput', FlappyNameInput);
        this.state.start('boot');
    }
}

function startApp(): void {
    let gameWidth: number = DEFAULT_GAME_WIDTH;
    let gameHeight: number = DEFAULT_GAME_HEIGHT;

    if (SCALE_MODE === 'USER_SCALE') {
        let screenMetrics: Utils.ScreenMetrics = Utils.ScreenUtils.calculateScreenMetrics(gameWidth, gameHeight);

        gameWidth = screenMetrics.gameWidth;
        gameHeight = screenMetrics.gameHeight;
    }

    // There are a few more options you can set if needed, just take a look at Phaser.IGameConfig
    let gameConfig: Phaser.IGameConfig = {
        width: gameWidth,
        height: gameHeight,
        renderer: Phaser.AUTO,
        parent: '',
        resolution: 1
    };

    let app = new App(gameConfig);
}

window.onload = () => {
    let webFontLoaderOptions: any = null;
    let webFontsToLoad: string[] = GOOGLE_WEB_FONTS;

    if (webFontsToLoad.length > 0) {
        webFontLoaderOptions = (webFontLoaderOptions || {});

        webFontLoaderOptions.google = {
            families: webFontsToLoad
        };
    }

    if (Object.keys(Assets.CustomWebFonts).length > 0) {
        webFontLoaderOptions = (webFontLoaderOptions || {});

        webFontLoaderOptions.custom = {
            families: [],
            urls: []
        };

        for (let font in Assets.CustomWebFonts) {
            webFontLoaderOptions.custom.families.push(Assets.CustomWebFonts[font].getFamily());
            webFontLoaderOptions.custom.urls.push(Assets.CustomWebFonts[font].getCSS());
        }
    }

    if (webFontLoaderOptions === null) {
        // Just start the game, we don't need any additional fonts
        startApp();
    } else {
        // Load the fonts defined in webFontsToLoad from Google Web Fonts, and/or any Local Fonts then start the game knowing the fonts are available
        webFontLoaderOptions.active = startApp;

        WebFontLoader.load(webFontLoaderOptions);
    }
};
