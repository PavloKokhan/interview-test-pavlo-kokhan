import list from '../mocks/list.json';
import study from '../mocks/details.json';

export const getStudies = (filter) => {
  return new Promise((resolve, reject) => {
    if (filter) {
      setTimeout(() => {
        resolve({data: list.data.filter((item) => item.statusKey === filter)});
      }, 500)
    } else {
      setTimeout(() => {
        resolve({data: list.data});
      }, 500)
    }

  })
}

export const getStudy = (id) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        study.meta.study.gallery = study.data;
        console.log(study.meta.study);
        resolve({data: study.meta.study});
      }, 500)
  })
}
