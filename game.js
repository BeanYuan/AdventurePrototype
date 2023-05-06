class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "Village Bar");
    }

    onEnter() {
        
        let drunk = this.add.text(this.w * 0.3, this.w * 0.3, "👨 drunk")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("He looks very drunk."))
            .on('pointerdown', () => {
                this.showMessage("Let's drink 🍻!");
                drunk.setText("👨 drunk ✅")
                this.gainItem('drunkTalk');
            });
        
        let tavernkeeper = this.add.text(this.w * 0.5, this.w * 0.1, "👨‍🦱 tavernkeeper")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("He is the owner of this bar."))
            .on('pointerdown', () => {
                this.showMessage(`
Customers are becomming less these days,
people are afraid of coming out at night
because of the monster.
                `);
                tavernkeeper.setText("👨‍🦱 tavernkeeper ✅")
                this.gainItem('tavernkeeperTalk');
            });
        
        let hunter = this.add.text(this.w * 0.5, this.w * 0.5, "👨‍🦰 hunter")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("A scar on his face."))
            .on('pointerdown', () => {
                this.showMessage(`
I'm lucky to survive from that monster,
it seems afraid some herds that I
was collecting. It's buckthorn, that may
help to kill it.
                `);
                hunter.setText("👨‍🦰 hunter ✅")
                this.gainItem('hunterTalk');
            });
        // let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
        //     .setFontSize(this.s * 2)
        //     .setInteractive()
        //     .on('pointerover', () => this.showMessage("Metal, bent."))
        //     .on('pointerdown', () => {
        //         this.showMessage("No touching!");
        //         this.tweens.add({
        //             targets: clip,
        //             x: '+=' + this.s,
        //             repeat: 2,
        //             yoyo: true,
        //             ease: 'Sine.inOut',
        //             duration: 100
        //         });
        //     });

        // let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
        //     .setFontSize(this.s * 2)
        //     .setInteractive()
        //     .on('pointerover', () => {
        //         this.showMessage("It's a nice key.")
        //     })
        //     .on('pointerdown', () => {
        //         this.showMessage("You pick up the key.");
        //         this.gainItem('key');
        //         this.tweens.add({
        //             targets: key,
        //             y: `-=${2 * this.s}`,
        //             alpha: { from: 1, to: 0 },
        //             duration: 500,
        //             onComplete: () => key.destroy()
        //         });
        //     })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("drunkTalk") &&  this.hasItem("tavernkeeperTalk") && this.hasItem("hunterTalk")) {
                    this.showMessage("It's time to alchemy house to craft the herd.");
                } else {
                    this.showMessage("You should talk to everyone before leave.");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("drunkTalk") &&  this.hasItem("tavernkeeperTalk") && this.hasItem("hunterTalk")) {
                    this.loseItem("drunkTalk");
                    this.loseItem("tavernkeeperTalk");
                    this.loseItem("hunterTalk");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
                }
            })

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "Alchemy House");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Witcher: Element Dungeon").setFontSize(50);
        this.add.text(50,100, `
As a witcher, you accept a quest that there is a monster in the cave
near the village and the monster usually comes out to kill the animal and people at night.
The villagers need you to go to the cave and kill the monster.And now you need to
collect some informations for the monster to get prepared for it.
Now it’s time to set off…..
        `).setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Demo1, Demo2], //[Intro, Demo1, Demo2, Outro],
    title: "Adventure Game",
});

