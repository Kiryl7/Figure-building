import React from 'react';
import './Game.css';
import Map from '../Map/Map.jsx'

class Game extends React.Component {

    state = {
        typeComand: '',
        command: '',
        isCanvasExist: false,
        gameMatrix: []
    }

    onChangeCanvas = (event) => {
        const value = document.getElementById('canvas').value;
        
        this.setState({
            typeComand: value === '' ? '' : 'canvas',
            command: value,
        })
    };

    onChangeLine = () => {
        const value = document.getElementById('line').value;

        this.setState({
            typeComand: value === '' ? '' : 'line',
            command: value,
        })
    };

    onChangeRectangle = () => {
        const value = document.getElementById('rectangle').value;

        this.setState({
            typeComand: value === '' ? '' : 'rectangle',
            command: value,
        })
    };

    onChangeBucketFill = () => {
        const value = document.getElementById('bucketFill').value;

        this.setState({
            typeComand: value === '' ? '' : 'bucketFill',
            command: value,
        })
    };

    createMatrix = () => {
        const {gameMatrix} = this.state;
        const matrix = gameMatrix.slice();

        const value = document.getElementById('canvas').value;

        const arg = value.split(' ')

        const x = parseInt(arg.shift())
        const y = parseInt(arg.shift())  

        if(typeof x != "number" || typeof y != "number" || x <= 0 || y <= 0) { //проверка на валидные значения
            alert('Please, enter valid value')
            return;
        }

        for(let i = 0; i < y; i++){ //заполнение матрицы
            const line = []
            for(let j = 0; j < x; j++){
                line.push('Black')
            }
            matrix.push(line)
        }
        document.getElementById('canvas').value  = ''
        this.setState({
            gameMatrix: matrix,
            typeComand: '',
        })
    }


    createLine = () => {
        const value = document.getElementById('line').value
        const {gameMatrix} = this.state;

        const matrix = gameMatrix.slice();

        const arg = value.split(' ')

        const x1 = parseInt(arg.shift())
        const y1 = parseInt(arg.shift())
        const x2 = parseInt(arg.shift())
        const y2 = parseInt(arg.shift())
        const arr = matrix[0]

        if(typeof x1 !== "number" || typeof y1 !== "number"   //проверка на валидные значения
        || typeof x2 !== "number" || typeof y2 !== "number"){
            alert('Please, enter valid value')
            return
        }
          
        if(x1 > arr.length || x1 <= 0 || y1 > matrix.length || y1 <= 0 ||  //проверка на область допустимых значений 
           x2 > arr.length || x2 <= 0 || y2 > matrix.length || y2 <= 0) {
               alert('Out of Range!')
               return
           }

        if(x1 != x2 && y1 != y2){ //проверка на ввод только линий
            alert("It's not a line!")
            return
        }

        if(x1 == x2) {
            for(let i = y1-1; i < y2; i++){   //изменение значения по оси Y
                let temp = matrix[i]
                for(let j = x1-1; j < x2; j++){
                    temp.splice(j, 1, 'white')
                }
                matrix[i] = temp
            }
        }

        if(y1 == y2) {
            for(let i = y1-1; i < y2; i++){   //изменение значения по оси X
                let temp = matrix[i]
                for(let j = x1-1; j < x2; j++){
                    temp.splice(j, 1, 'white')
                }
                matrix[i] = temp
            }
        }
        document.getElementById('line').value = ''
        this.setState({
            gameMatrix: matrix,
            typeComand: '',
        })
    }

    createRectangel = () => {
        const value = document.getElementById('rectangle').value
        
        const {gameMatrix} = this.state
        const matrix = gameMatrix.slice()

        const arg = value.split(' ')

        const x1 = parseInt(arg.shift())
        const y1 = parseInt(arg.shift())
        const x2 = parseInt(arg.shift())
        const y2 = parseInt(arg.shift())
        const arr = matrix[0]

        if(typeof x1 !== "number" || typeof y1 !== "number"   //проверка на валидные значения
        || typeof x2 !== "number" || typeof y2 !== "number"){
            alert('Please, enter valid value')
            return
        }
          
        if(x1 > arr.length || x1 <= 0 || y1 > matrix.length || y1 <= 0 ||  //проверка на область допустимых значений 
           x2 > arr.length || x2 <= 0 || y2 > matrix.length || y2 <= 0) {
               alert('Out of Range!')
               return
           }

           if(x1 >= x2 || y1 >= y2){ //проверка на правильню последовательность координат
               alert('Wrong data')
               return
           }

        for(let i = y1-1; i < y2; i++){   //отрисовка левой вертикали
            let temp = matrix[i]
            for(let j = x1-1; j < x1; j++){
                temp.splice(j, 1, 'white')
            }
            matrix[i] = temp
        }

        for(let i = y1-1; i < y1; i++){   //отрисовка верхней горизонтали 
            let temp = matrix[i]
            for(let j = x1-1; j < x2; j++){
                temp.splice(j, 1, 'white')
            }
            matrix[i] = temp
        }

        for(let i = y2-1; i >= y1; i--){   //отрисовка правой вертикали
            let temp = matrix[i]
            for(let j = x2-1; j < x2; j++){
                temp.splice(j, 1, 'white')
            }
            matrix[i] = temp
        }

        for(let i = y2-1; i < y2; i++){   //отрисовка нижней горизонтали 
            let temp = matrix[i]
            for(let j = x2-1; j >= x1; j--){
                temp.splice(j, 1, 'white')
            }
            matrix[i] = temp
        }
        document.getElementById('rectangle').value = ''
        this.setState({
            gameMatrix: matrix,
            typeComand: '',
        })
    }

        createbucketFill = () => {
            const value = document.getElementById('bucketFill').value

            const {gameMatrix} = this.state
            const matrix = gameMatrix.slice()

            const arg = value.split(' ')

            const x = parseInt(arg.shift())
            const y = parseInt(arg.shift())  
            const newColor = arg.shift()
            const arr = matrix[0]

            
            if(typeof x != "number" || typeof y != "number" || x <= 0 || y <= 0 ) { //проверка на валидные значения
                alert('Please, enter valid value!')
                return;
            }
            
            if(x > arr.length || x <= 0 || y > matrix.length || y <= 0){  //проверка на область допустимых значений 
                    alert('Out of Range!')
                    return
                }

            if(newColor == undefined){  //проверка на ввод всех аргументов
                alert('Please, enter all value!')
                return
            }

            function recursion(x,y) {
                if(x < matrix.length && x >= 0 && y >= 0 && y < arr.length && matrix[x][y] == 'Black'){
                    matrix[x][y] = newColor
                    recursion(x+1,y)
                    recursion(x,y+1)
                    recursion(x-1,y)
                    recursion(x,y-1)
                }
                else return
            }

            recursion(x,y)

            document.getElementById('bucketFill').value = ''
            this.setState({
                gameMatrix: matrix,
                typeComand: '',
            })
        }

    push = () => { // вызов метода, в зависимости от выбранного поля заполнения
        const {command, isCanvasExist, typeComand} = this.state

        switch(typeComand) {
            case 'canvas' : {
                this.createMatrix()
                break;
            }
            case 'line' : {
                this.createLine()
                break;
            }
            case 'rectangle' : {
                this.createRectangel()
                break;
            }
            case 'bucketFill' : {
                this.createbucketFill()
                break;
            }
            default: break;
        }

        if (!isCanvasExist && command !== '') { //проверка на наличие данных или созданное поле
            this.setState({
                isCanvasExist: true,
            })
        }
    };


    render() {

        const {typeComand, isCanvasExist, gameMatrix} = this.state;
        console.log(isCanvasExist)

        return (
            <div>
                <p>Please! Enter all arguments with a single space!</p>
                <p>Canvas <input id="canvas" type="text" onChange={this.onChangeCanvas} placeholder="Width Hight"
                    disabled={typeComand === 'canvas' || typeComand === '' ? false : true}/></p>
                {
                    isCanvasExist &&
                    <> 
                        <p>Line <input id="line" type="text" onChange={this.onChangeLine} placeholder="x1 y1 x2 y2"
                            disabled={typeComand === 'line' || typeComand === '' ? false : true}/></p>
                        <p>Rectangle <input id="rectangle" type="text" onChange={this.onChangeRectangle} placeholder="x1 y1 x2 y2"
                            disabled={typeComand === 'rectangle' || typeComand === '' ? false : true}/></p>
                        <p>Bucket Fill <input id="bucketFill" type="text" onChange={this.onChangeBucketFill} placeholder="x y Color"
                            disabled={typeComand === 'bucketFill' || typeComand === '' ? false : true}/></p> 
                    </>
                }
                
                <button onClick={this.push}>Push</button>

                <Map gameMatrix={gameMatrix}/>
                
            </div>
        )
    }
}

export default Game;