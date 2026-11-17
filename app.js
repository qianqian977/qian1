const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? '关闭导航' : '打开导航');
  navigation.classList.toggle('open', isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.querySelectorAll('a').forEach(item => item.classList.toggle('active', item === link));
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', '打开导航');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    navigation.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '打开导航');
    menuToggle.focus();
  }
});
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => {
    item.classList.toggle('selected', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  document.querySelectorAll('.dish').forEach(dish => {
    dish.hidden = button.dataset.filter !== 'all' && dish.dataset.category !== button.dataset.filter;
  });
}));
const dateInput = document.querySelector('#booking-date');
const localDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};
dateInput.min = localDate();
dateInput.addEventListener('focus', () => { dateInput.min = localDate(); });
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#booking-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const status = document.querySelector('#booking-status');
  if (data.get('date') < localDate()) {
    dateInput.setCustomValidity('请选择今天或以后的日期');
    dateInput.reportValidity();
    return;
  }
  status.textContent = `${String(data.get('name')).trim() || '您好'}，您选择了 ${data.get('date')} ${data.get('time')}，${data.get('guests')}。这是订位效果演示，信息未发送，也未保存；真实订位功能待接入。`;
});
dateInput.addEventListener('input', () => dateInput.setCustomValidity(''));
