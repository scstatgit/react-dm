import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';

const customers = [
  {
    'id': 1,
    'image': 'https://placehold.co/60x60/png',
    'name': '홍길동', 
    'birthday': '961222',
    'gender': '남자',
    'job': '대학생'
  },
  {
    'id': 2,
    'image': 'http://picsum.photos/id/427/60/60',
    'name': '김철수', 
    'birthday': '960301',
    'gender': '남자',
    'job': '직업군인'
  },
  {
    'id': 3,
    'image': 'http://picsum.photos/id/428/60/60',
    'name': '이영희', 
    'birthday': '960509',
    'gender': '여자',
    'job': '직장인'
  }
]


class App extends Component {
  render() {
    return (
      <div>
        {
          customers.map(c => {
            return (
              <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                job={c.job}
              />);
          })
        }
      </div>
    );
  }
}


// class App extends Component {
//   render() {
//     return (
//       <div>
//       <Customer 
//         id={customers[0].id}
//         image={customers[0].image}
//         name={customers[0].name}
//         birthday={customers[0].birthday}
//         gender={customers[0].gender}
//         job={customers[0].job}
//       />
//       <Customer 
//         id={customers[1].id}
//         image={customers[1].image}
//         name={customers[1].name}
//         birthday={customers[1].birthday}
//         gender={customers[1].gender}
//         job={customers[1].job}
//       />
//       <Customer 
//         id={customers[2].id}
//         image={customers[2].image}
//         name={customers[2].name}
//         birthday={customers[2].birthday}
//         gender={customers[2].gender}
//         job={customers[2].job}
//       />
//       </div>
//     );
//   }
// }


export default App;