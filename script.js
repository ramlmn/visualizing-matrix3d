(function() {
  'use strict';

  const canvas = document.querySelector('#demo__container');

  const toggle = document.querySelector('#toggle-view');
  toggle.addEventListener('change', _ => {
    if (toggle.checked) {
      canvas.style.transform = 'none';
    } else {
      canvas.style.transform = '';
    }
  });

  const m11 = document.querySelector('#m11');
  const m12 = document.querySelector('#m12');
  const m13 = document.querySelector('#m13');
  const m14 = document.querySelector('#m14');
  const m21 = document.querySelector('#m21');
  const m22 = document.querySelector('#m22');
  const m23 = document.querySelector('#m23');
  const m24 = document.querySelector('#m24');
  const m31 = document.querySelector('#m31');
  const m32 = document.querySelector('#m32');
  const m33 = document.querySelector('#m33');
  const m34 = document.querySelector('#m34');
  const m41 = document.querySelector('#m41');
  const m42 = document.querySelector('#m42');
  const m43 = document.querySelector('#m43');
  const m44 = document.querySelector('#m44');

  const sliders = [m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44];

  const rX = document.querySelector('#rotateX');
  const rY = document.querySelector('#rotateY');
  const rZ = document.querySelector('#rotateZ');

  const target = document.querySelector('.demo-element');
  const code = document.querySelector('.demo-code');

  sliders.forEach(input => {
    input.addEventListener('input', evt => {
      const target = evt.currentTarget;
      const label = target.parentNode.querySelector('.item-input__label');
      label.innerHTML = target.dataset.label.replace('$', target.value);
      calculateTransform();
    });
  });

  [rX, rY, rZ].forEach(input => {
    input.addEventListener('input', evt => {
      const target = evt.currentTarget;
      const label = target.parentNode.querySelector('.item-input__label');
      label.innerHTML = target.dataset.label.replace('$', target.value);
      calculateRotateTransform();
    });
  });

  function getValues() {
    return sliders.map(slider => parseFloat(slider.value));
  }

  function calculateTransform() {
    const arr = getValues();

    const transform = [
      'matrix3d(',
      `  ${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]},`,
      `  ${arr[4]}, ${arr[5]}, ${arr[6]}, ${arr[7]},`,
      `  ${arr[8]}, ${arr[9]}, ${arr[10]}, ${arr[11]},`,
      `  ${arr[12]}, ${arr[13]}, ${arr[14]}, ${arr[15]}`,
      ')',
    ].join('\n');

    code.textContent = `transform: ${transform}`;
    target.style.transform = transform;
  }

  function calculateRotateTransform() {
    const arr = getValues();
    // let arr = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

    const rx = parseFloat(rX.value);
    const ry = parseFloat(rY.value);
    const rz = parseFloat(rZ.value);

    const A = Math.cos(rx * (Math.PI / 180));
    const B = Math.sin(rx * (Math.PI / 180));
    const C = Math.cos(ry * (Math.PI / 180));
    const D = Math.sin(ry * (Math.PI / 180));
    const E = Math.cos(rz * (Math.PI / 180));
    const F = Math.sin(rz * (Math.PI / 180));

    // new transform array
    const newt = [];
    newt[0] = C * E * arr[0];
    newt[1] = -1 * F;
    newt[2] = D;
    newt[3] = arr[3];
    newt[4] = F;
    newt[5] = A * E * arr[5];
    newt[6] = B;
    newt[7] = arr[7];
    newt[8] = -1 * D;
    newt[9] = -1 * B;
    newt[10] = C * A * arr[10];
    newt[11] = arr[11];
    newt[12] = arr[12];
    newt[13] = arr[13];
    newt[14] = arr[14];
    newt[15] = arr[15];

    const fixedNewt = newt.map(item => parseFloat(parseFloat(item).toFixed(3)));

    // for (let i = 0; i < 16; i++) {
    //   sliders[i].value = fixedNewt[i];
    // }

    const transform = [
      'matrix3d(',
      `  ${fixedNewt[0]}, ${fixedNewt[1]}, ${fixedNewt[2]}, ${fixedNewt[3]},`,
      `  ${fixedNewt[4]}, ${fixedNewt[5]}, ${fixedNewt[6]}, ${fixedNewt[7]},`,
      `  ${fixedNewt[8]}, ${fixedNewt[9]}, ${fixedNewt[10]}, ${fixedNewt[11]},`,
      `  ${fixedNewt[12]}, ${fixedNewt[13]}, ${fixedNewt[14]}, ${fixedNewt[15]}`,
      ')',
    ].join('\n');

    code.textContent = `transform: ${transform}`;
    target.style.transform = transform;
  }

  calculateTransform();
})();
