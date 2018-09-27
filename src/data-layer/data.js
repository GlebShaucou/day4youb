const promoCodes = [
    {
    	code: 'YMSMTM',
		title: 'Чайная комната',
		time: '14:00 – 15:00',
		place: 'Минск, пр. Независимости, 44, вход со двора (здание "Вечерний Минск")',
		placeUrl: 'https://www.google.com/maps/place/%D0%A7%D0%B0%D0%B9%D0%BD%D0%B0%D1%8F+%D0%9F%D0%BE%D1%87%D1%82%D0%B0+(%D0%A7%D0%B0%D0%B9%D0%BD%D0%B0%D1%8F+%D0%9A%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%B0)/@53.9111217,27.5786596,18.56z/data=!4m5!3m4!1s0x46dbcfbb5cdb5cb3:0x6562aa6ec500477b!8m2!3d53.9110945!4d27.5791202',
	    description: 'Это место, где к чаю относятся с большим воодушевлением и любовью. У нас вы сможете попробовать любой чай, проникнуться атмосферой чайного места. Так что приходите к нам на чайную церемонию, превращать чай в волшебные и целительные переживания.',
	    src: 'tea',
	    alt: 'tea',
	    isOpen: false,
    },
	{
		code: 'WAPFEO',
		title: 'Минский Планетарий',
		time: '15:00 – 16:00',
		place: 'Минск, ул. Фрунзе 2 (парк им. Горького)',
		placeUrl: 'https://www.google.com/maps/place/%D0%9C%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9+%D0%BF%D0%BB%D0%B0%D0%BD%D0%B5%D1%82%D0%B0%D1%80%D0%B8%D0%B9/@53.9040876,27.5732275,18.3z/data=!4m13!1m7!3m6!1s0x46dbcfb85496f3cb:0xaefc39ef9d075505!2z0YPQu9C40YbQsCDQpNGA0YPQvdC30LUgMiwg0JzQuNC90YHQug!3b1!8m2!3d53.9039425!4d27.574823!3m4!1s0x46dbcfc6ce39a047:0x43d9374be6c4e6c5!8m2!3d53.9044211!4d27.5734212',
		description: 'Если Вы еще не слышали, Луна сегодня снова становится популярна, причем очень сильно. Как и в славные 60-е и 70-е, наш космический сосед снова наслаждается вниманием лунных исследователей. Только на этот раз они намерены вернуться на Луну навсегда.',
		src: 'stars',
		alt: 'stars',
		isOpen: false,
	},
	{
		code: 'WWMTBT',
		title: 'Кафе «Камяніца»',
		time: '16:00 – 17:00',
		place: 'Минск ул. Первомайская, 18',
		placeUrl: 'https://www.google.com/maps/place/%D0%9A%D0%B0%D0%BC%D1%8F%D0%BD%D0%B8%D1%86%D0%B0/@53.9003117,27.5747735,20.74z/data=!4m5!3m4!1s0x46dbcfc7e9ea2829:0xb94da2cc74087191!8m2!3d53.9003488!4d27.5748883',
		description: 'Традыцыйная беларуская ежа, унікальная арганічнасць інтэр’еру, аўтэнтычная музыка даюць магчымасць акунуцца ў залатыя часы нашай краіны і часцінку іх пакінуць у сваёй душы. Хопіць раздумваць, давайце замовім адну з выдатных літоўскіх, польскіх або беларускіх страў, рэцэпты якіх стагоддзямі захоўвалі ашчадныя гаспадыні.',
		src: 'cafe',
		alt: 'cafe',
		isOpen: false,
	},
	{
		code: 'IAILWY',
		title: 'Усадьба «Домик в лесу»',
		time: '20:00 28.09.2018 – 12:00 30.09.2018',
		place: 'Минский район, д. Лихачи, ул. Центральная, 2',
		placeUrl: 'https://www.google.com/maps/place/Agrousadba+U+Mikhalicha/@53.9612891,27.1291303,19.8z/data=!4m7!3m6!1s0x46dbe66af5fe1f73:0x4843b49cd41c4940!5m1!1s2018-10-24!8m2!3d53.96139!4d27.1294445',
		description: 'Дом выполнен из дерева, стилизован в духе национальной традиции. Под сводами крыши дома расположена уютная спальня с большой кроватью. Здесь также есть гостиная-студия, совмещающая кухню и зону отдыха. Дом расположен в сосновом лесу, что гарантирует гостям свежий и ароматный воздух. Баня, расположенная внутри дома, оснащена просторной парилкой, современным душем, комнатой отдыха. Так же на территории усадьбы организовано бесплатное питание. Для организации трансфера просьба связаться по тел. +375295844796 Александр и согласовать время и место  отправления.',
		src: 'village',
		alt: 'village',
		isOpen: false,
	},
	{
		code: 'DNWYMM',
		title: 'Здесь',
		time: 'Сейчас',
		place: '',
		placeUrl: '',
		description: 'Даша, Вам просто нужно ответить на вопрос.',
		src: 'question',
		alt: 'question',
		isOpen: false,
	},
];

const defaultPromo = {
	title: 'Закрыто',
	place: 'Введите промокод, чтобы открыть',
	src: 'closedPromo',
	alt: 'Введите промокод, чтобы открыть',
};

export default {
	promoCodes,
	defaultPromo,
};
