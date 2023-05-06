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
        let buckthorn = this.add.text(this.w * 0.3, this.w * 0.2, "🎍 buckthorn")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Literally a buckthorn."))
            .on('pointerdown', () => {
                this.showMessage("Get a buckthorn.");
                buckthorn.destroy();
                this.gainItem('buckthorn');
            });
        
        let abrader = this.add.text(this.w * 0.4, this.w * 0.3, "🔬 abrader")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("It can make the buckthorn to powder."))
            .on('pointerdown', () => {
                this.showMessage("Get a abrader.");
                abrader.destroy();
                this.gainItem('abrader');
            });
        
        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("green powder")) {
                    this.showMessage("It's time to find the monster.");
                } else {
                    this.showMessage("You haven't crafted the herd.");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("green powder")) {
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo3');
                }
            })
        // this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
        //     .setFontSize(this.s * 2)
        //     .setInteractive()
        //     .on('pointerover', () => {
        //         this.showMessage("You've got no other choice, really.");
        //     })
        //     .on('pointerdown', () => {
        //         this.gotoScene('demo1');
        //     });

        // let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
        //     .setInteractive()
        //     .on('pointerover', () => {
        //         this.showMessage('*giggles*');
        //         this.tweens.add({
        //             targets: finish,
        //             x: this.s + (this.h - 2 * this.s) * Math.random(),
        //             y: this.s + (this.h - 2 * this.s) * Math.random(),
        //             ease: 'Sine.inOut',
        //             duration: 500
        //         });
        //     })
        //     .on('pointerdown', () => this.gotoScene('outro'));
    }
    update() {
        if (this.hasItem("buckthorn") && this.hasItem("abrader") && !this.hasItem("craftable")) {
            this.gainItem("craftable");
            let craft = this.add.text(this.w * 0.2, this.w * 0.3, "craft button")
                .setFontSize(this.s * 2)
                .setInteractive()
                .on('pointerover', () => {
                    this.showMessage("Click me to craft herd.");
                })
                .on('pointerdown', () => {
                    this.gainItem("green powder");
                    this.loseItem("buckthorn");
                    this.loseItem("abrader");
                    this.loseItem("craftable");
                    craft.destroy();
                });
        }
    }
}

class Demo3 extends AdventureScene {
    constructor() {
        super("demo3", "Outside of Cave");
    }
    onEnter() {
        let stone = this.add.text(this.w * 0.4, this.w * 0.5, "🧱 stone")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("A stone."))
            .on('pointerdown', () => {
                this.showMessage("Get a stone.");
                stone.destroy();
                this.gainItem('stone');
            });

        let wall = this.add.text(this.w * 0.3, this.w * 0.2, "🔩🔩🔩 wall")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("stone")) {
                    this.showMessage("Maybe I can use the stone to hit the wall, to check the monster. Whether is here not not.");
                } else {
                    this.showMessage("What should I do to a wall?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("stone")) {
                    this.showMessage("Okay, monster is not here. I have time to make a trap.");
                    wall.destroy();
                    this.loseItem("stone");
                    this.gainItem("readyToTrap");
                } else {
                    this.showMessage("Don't hit a wall with bare hand!");
                }
            });

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("readyToTrap")) {
                    this.showMessage("It's time to make a trap.");
                } else {
                    this.showMessage("Don't go deeper yet, not sure monster is here or not.");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("readyToTrap")) {
                    this.showMessage("*squeak*");
                    this.loseItem("readyToTrap");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo4');
                }
            })
    }
}

class Demo4 extends AdventureScene {
    constructor() {
        super("demo4", "Monster Lair");
    }
    onEnter() {
        let string = this.add.text(this.w * 0.3, this.w * 0.2, "🔗 string")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("A string."))
            .on('pointerdown', () => {
                this.showMessage("Get a string.");
                string.destroy();
                this.gainItem('string');
            });
        
        let stick = this.add.text(this.w * 0.4, this.w * 0.3, "🥍 stick")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("A stick."))
            .on('pointerdown', () => {
                this.showMessage("Get a stick.");
                stick.destroy();
                this.gainItem('stick');
            });
        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("trap")) {
                    this.showMessage("Let's go to place it.");
                } else {
                    this.showMessage("Don't go deeper yet, you don't have a trap.");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("trap")) {
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo5');
                }
            })
    }
    update() {
        if (this.hasItem("stick") && this.hasItem("string") && !this.hasItem("craftable")) {
            this.gainItem("craftable");
            let craft = this.add.text(this.w * 0.2, this.w * 0.3, "craft button")
                .setFontSize(this.s * 2)
                .setInteractive()
                .on('pointerover', () => {
                    this.showMessage("Click me to craft trap.");
                })
                .on('pointerdown', () => {
                    this.gainItem("trap");
                    this.loseItem("string");
                    this.loseItem("stick");
                    this.loseItem("craftable");
                    craft.destroy();
                });
        }
    }
    
}

class Demo5 extends AdventureScene {
    constructor() {
        super("demo5", "Monster is coming");
    }
    onEnter() {
        let hole1 = this.add.text(this.w * 0.2, this.w * 0.2, "( ) in the front of the cave")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Should I place it here?"))
            .on('pointerdown', () => {
                this.showMessage("You place it here.");
                hole1.setText("💣");
                this.loseItem("trap");
                this.gainItem("frontTrap");
                hole2.destroy();
                hole3.destroy();
            });
        let hole2 = this.add.text(this.w * 0.3, this.w * 0.3, "( ) next to the rock")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Should I place it here?"))
            .on('pointerdown', () => {
                this.showMessage("You place it here.");
                hole2.setText("💣");
                this.loseItem("trap");
                this.gainItem("rockTrap");
                hole1.destroy();
                hole3.destroy();
            });
        let hole3 = this.add.text(this.w * 0.4, this.w * 0.5, "( ) in the middle of the vae")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Should I place it here?"))
            .on('pointerdown', () => {
                this.showMessage("You place it here.");
                hole3.setText("💣");
                this.loseItem("trap");
                this.gainItem("middleTrap");
                hole1.destroy();
                hole2.destroy();
            });
        let rock = this.add.text(this.w * 0.5, this.w * 0.1, "🗿 rock")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("A rock"))
    }
    update() {
        if (!this.hasItem("trap") && !this.hasItem("monsterIsComing")) {
            this.gainItem("monsterIsComing");
            this.time.delayedCall(2000, () => {
                this.showMessage("It's coming, hide!");
                this.add.text(this.w * 0.6, this.w * 0.05, "🧑 you")
                    .setFontSize(this.s * 2)
                    .setInteractive()
                    .on('pointerover', () => this.showMessage("What?"))
                    .on('pointerdown', () => this.showMessage("Don't touch me, you idiot! It's coming!"));
            });
            let monster = this.add.text(this.w * 0.1, this.w * 0.3, '🏇 monster')
                .setFontSize(this.s * 2)
                .setInteractive()
                .on('pointerdown', () => {
                    if (this.hasItem("catchIt")) {
                        this.showMessage("You use the green powder kill the monster");
                        this.loseItem("green powder");
                    }
                });
            let tween = this.tweens.add({
                targets: monster,
                x: this.w * 0.35,
                y: this.w * 0.3,
                duration: 2000,
                ease: 'Linear',
                onComplete: () => { 
                    if (this.hasItem("rockTrap")) {
                        this.showMessage("You catch it!");
                        this.gainItem("catchIt");
                        this.time.delayedCall(2000, () => {
                            this.gotoScene("good");
                        });
                    } else {
                        this.showMessage("You let it go!");
                        this.time.delayedCall(2000, () => {
                            this.gotoScene("bad");
                        });
                    }
                }
            });
        }
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

class Good extends Phaser.Scene {
    constructor() {
        super('good');
    }
    create() {
        this.add.text(50, 50, "You catch the monster!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

class Bad extends Phaser.Scene {
    constructor() {
        super('bad');
    }
    create() {
        this.add.text(50, 50, "You let it go!").setFontSize(50);
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
    scene: [Intro, Demo1, Demo2, Demo3, Demo4, Demo5, Good, Bad], //[Intro, Demo1, Demo2, Outro],
    title: "Adventure Game",
});

