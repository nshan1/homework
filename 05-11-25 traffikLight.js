class LightState {
    next(light){};
    getColor(){};
    action(){};
}

class RedLight extends LightState {
    next(light) {
        light.state = new GreenLight()
    }

    getColor(){return "Red"}

    action(){
        console.log("🟥 STOP — Cars must wait.");
    }
}
class GreenLight extends LightState {
    next(light) {
        light.state = new YellowLight()
    }

    getColor(){return "Green"}

    action(){
        console.log("🟩 GO — Cars may drive.");
    }
}
class YellowLight extends LightState {
    next(light) {
        light.state = new RedLight()
    }

    getColor(){return 'Yellow'}

    action(){
        console.log("🟨 SLOW DOWN — Prepare to stop.");
    }
}

class TrafficLight{
    constructor(){
        this.state = new RedLight()
    }

    setState(state){
        this.state = state;
    }

    next(){
        this.state.next(this)
    }
    
    show(){
        this.state.action()
    }    
}

const light = new TrafficLight();

light.show();   // 🟥 STOP — Cars must wait.
light.next();
light.show();   // 🟩 GO — Cars may drive.
console.log(light.state.getColor());
light.setState(new YellowLight());
light.show();
light.next();
light.show();   // 🟨 SLOW DOWN — Prepare to stop.
light.next();
light.show();   // 🟥 STOP — Cars must wait.
