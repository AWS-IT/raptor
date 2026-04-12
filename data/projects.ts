import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'imbrand',
    title: 'IMBRAND',
    shortDescription: 'Магазин женской одежды',
    fullDescription: 'информация о магазине',
    image: '/images/reviews/imbrand/imlogo.jpeg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'MySQL'],
    link: 'https://fintech-demo.example.com',
    review: {
      companyLogo: '',
      text: 'Работа была выполнена на высшем уровне. Разработчик полностью погрузился в специфику нашего бизнеса и предложил решения, которые превзошли наши ожидания. Особенно впечатлила скорость работы и внимание к деталям.',
      authorName: 'Имани Алапаева',
      authorPosition: 'Верховный торгаш'
    }
  },
  {
    id: 'shahshop',
    title: 'ShahShop',
    shortDescription: 'Современная платформа интернет-магазина',
    fullDescription: 'ШАХ - специализируемся на производстве брендированной одноразовой посуды для бизнеса. Наши клиенты — это кофейни, пекарни, точки to-go и корнер-бары, которые хотят выделиться и создать узнаваемый образ.',
    image: '/images/reviews/shahshop/shah.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    link: 'https://shahshop.ru',
    review: {
      companyLogo: '/images/reviews/shop-logo.svg',
      text: 'Запустили интернет-магазин в рекордные сроки. Платформа работает стабильно, конверсия выросла на 40% по сравнению со старым сайтом. Рекомендуем как надёжного исполнителя для серьёзных проектов.',
      authorName: 'Муслим Шахтамиров',
      authorPosition: 'Предпрениматель'
    }
  },
  {
    id: 'groznycapital',
    title: 'KVADRAT',
    shortDescription: 'Помощь в подборе жилья в новостройках',
    fullDescription: 'Риелторская компания',
    image: '/images/reviews/groznycapital/groznycapital.jpg',
    technologies: ['JS', 'HTML', 'SSAS', 'JSON'],
    link: 'https://groznycapital.ru',
    review: {
      text: 'Система полностью изменила наш подход к работе с клиентами. Все процессы стали прозрачными, менеджеры экономят по 2 часа в день. Техническая поддержка всегда на связи, любые доработки делаются быстро.',
      authorName: 'имя',
      authorPosition: 'Руководитель отдела продаж'
    }
  }/*,
  {
    id: 'burgerdeluxe',
    title: 'Burger Deluxe',
    shortDescription: 'Сервис онлайн-бронирования для сети отелей',
    fullDescription: 'Система бронирования для гостиничной сети. Поиск и фильтрация номеров, календарь доступности, онлайн-оплата, личный кабинет гостя, интеграция с PMS системами, мультиязычность.',
    image: '/images/projects/booking.jpg',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Redis', 'Docker'],
    link: 'https://booking-demo.example.com',
    review: {
      companyLogo: '/images/reviews/hotel-logo.svg',
      text: 'Благодаря новой системе бронирования мы сократили время обработки заявок в 3 раза. Гости отмечают удобство интерфейса. За год работы не было ни одного серьёзного сбоя.',
      authorName: 'Елена Смирнова',
      authorPosition: 'IT-директор, Grand Hotels'
    }
  },
  {
    id: 'logistics-app',
    title: 'Logistics App',
    shortDescription: 'Мобильное приложение для логистической компании',
    fullDescription: 'Кроссплатформенное приложение для управления доставками. Отслеживание грузов в реальном времени, оптимизация маршрутов, электронные накладные, push-уведомления, офлайн-режим для водителей.',
    image: '/images/projects/logistics.jpg',
    technologies: ['React Native', 'Node.js', 'GraphQL', 'MongoDB', 'Google Maps API'],
    review: {
      text: 'Приложение вывело нашу логистику на новый уровень. Клиенты видят где их груз, водители получают оптимальные маршруты, а мы — полную аналитику. Инвестиции окупились за 4 месяца.',
      authorName: 'Игорь Волков',
      authorPosition: 'Операционный директор, FastDelivery'
    }
  },
   {
    id: 'ecommerce-platform1',
    title: 'E-Commerce Platform',
    shortDescription: 'Современная платформа интернет-магазина с CMS',
    fullDescription: 'Полнофункциональная e-commerce платформа с административной панелью. Каталог товаров с фильтрацией, корзина, оформление заказов, интеграция с платёжными системами, система уведомлений и аналитика продаж.',
    image: '/images/projects/ecommerce.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    link: 'https://shop-demo.example.com',
    review: {
      companyLogo: '/images/reviews/shop-logo.svg',
      text: 'Запустили интернет-магазин в рекордные сроки. Платформа работает стабильно, конверсия выросла на 40% по сравнению со старым сайтом. Рекомендуем как надёжного исполнителя для серьёзных проектов.',
      authorName: 'Мария Иванова',
      authorPosition: 'Директор по маркетингу, StyleShop'
    }
  }*/
];
