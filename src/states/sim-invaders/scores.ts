import * as Assets from '../../assets';
import {ScoreService, Games} from '../../services/ScoreService';

export default class SimInvadersScoreboard extends Phaser.State {
    title: Phaser.Sprite;
    scoreText: Phaser.Text;
    scoreService: ScoreService;
    scoreList: Phaser.Group;

    public create(): void {
        this.title = new Phaser.Sprite(this.game, this.game.world.centerX, 300, Assets.Spritesheets.SpritesheetsSimInvaders800600.getName(), 0);
        this.title.anchor.set(0.5);

        this.scoreText = new Phaser.Text(this.game, this.game.world.centerX - 10, this.game.world.height * 0.47 , 'Score', {
            font: '42px ' + Assets.GoogleWebFonts.VT323,
            boundsAlignV: 'middle',
            boundsAlignH: 'middle',
            fill: '#FFFFFF'
        });
        this.scoreText.anchor.set(0.5);
        this.game.add.existing(this.scoreText)
        this.scoreList = new Phaser.Group(this.game);
        this.game.add.existing(this.scoreList);
        this.game.add.existing(this.title);
        this.scoreService = new ScoreService();
        this.createScoreList([
            {
                name: 'Hello',
                score: 1000
            },
            {
                name: 'Hello',
                score: 1000
            },
            {
                name: 'Hello',
                score: 1000
            }
        ])
    }

    private createScoreList(scores: any[]) {
        let positionY = this.game.height * 0.5;
        scores.forEach(score => {
            let nameText = new Phaser.Text(this.game, this.game.width * 0.3, positionY , score.name, {
                font: '30px ' + Assets.GoogleWebFonts.VT323,
                boundsAlignV: 'middle',
                boundsAlignH: 'middle',
                fill: '#FFFFFF'
            });
            this.scoreList.add(nameText);

            let scoreText = new Phaser.Text(this.game, this.game.width * 0.7, positionY , score.score, {
                font: '30px ' + Assets.GoogleWebFonts.VT323,
                boundsAlignV: 'middle',
                boundsAlignH: 'middle',
                fill: '#FFFFFF'
            });
            scoreText.anchor.set(1, 0);
            this.scoreList.add(scoreText);
            positionY += 30;
        })
    }
    private async loadScores() {
        try {
            let scores = await this.scoreService.getScores(Games.FlappyScrangle);
            this.createScoreList(scores);
        } catch (error) {
            console.log('Could not load scores');
        }
    }

    public update() {
    }
}