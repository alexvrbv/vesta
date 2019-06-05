//JSON with regions/offices
var contacts = [
    {
        "region":"Санкт-Петербург, 199865",
        "offices":
        [
            {
                "id":"1",
                "address":"<strong>офис 1</strong> ул.Белы Куна, д.30, лит.А (б/ц 'Софийская площадь')",
                "latitude":"59.928879",
                "longitude":"30.253256",
            },
            {
                "id":"2",
                "address":"<strong>офис 2</strong> ул.Белы Куна, д.30, лит.А (б/ц 'Софийская площадь')",
                "latitude":"57.117025",
                "longitude":"65.652429",
            }
        ]
    },
    {
        "region":"Москва, 199865",
        "offices":
        [
            {
                "id":"3",
                "address":"<strong>офис 3</strong> ул.Белы Куна, д.30, лит.А (б/ц 'Софийская площадь')",
                "latitude":"61.278464",
                "longitude":"73.419048",
            },
            {
                "id":"4",
                "address":"<strong>офис 4</strong> ул.Белы Куна, д.30, лит.А (б/ц 'Софийская площадь')",
                 "latitude":"60.943750",
                "longitude":"76.547035",
            }
        ]
    },
];
//Vars for html of regions/offices
var htmlRegions;
var htmlOffices;

$(document).ready(function(){
    navbarAuthInit();
    regionSelectInit();
    contactsRegionInit();
    catalogDropdownMenuInit();
    slidersInit();
    popupsInit();
    companyPageTitleChangeInit();
    phoneMaskInit();
    matchHeightOfElementsInit();
    productQuantityValueChangeInit();
    contentCustomScrollInit();
});

//Navbar auth on click (redirect to profile)
function navbarAuthInit() {
    $('.navbar-auth').on('click', function(){
        window.location.href = "profile.html";
    });
}

//Region select
function regionSelectInit() {
    $(document).on('click', '.js-toggle-dropdown', function(){
        var dropdownButton = $(this),
            dropdownButtonText = $.trim(dropdownButton.text()),
            dropdownWidth = dropdownButton.width(),
            dropdownWrapper = dropdownButton.closest('.js-dropdown'),
            dropdownList = dropdownWrapper.find('.js-dropdown-list'),
            dropdownItems = dropdownWrapper.find('.js-dropdown-item')
            dropdownItem = dropdownItems.first(),
            dropdownItemText = $.trim(dropdownItem.html()),
            dropdownActiveClass = dropdownItem.attr('data-active');

        dropdownList.slideToggle(300);
        dropdownItems.click(function(){
            dropdownItem = $(this),
            dropdownItemText = $.trim(dropdownItem.html());
            if (!dropdownItem.hasClass(dropdownActiveClass)){
                dropdownButton.html(dropdownItemText).width(dropdownWidth);
                dropdownItems.removeClass(dropdownActiveClass);
                dropdownItem.addClass(dropdownActiveClass);
                dropdownList.slideUp(300);
                if($(this).parent().hasClass('contacts-content__region-item')) {
                    regionOfficesInit($(this).text());
                }
            }
        });
        $(document).keyup(function(e){
            if (e.keyCode == 27){
                dropdownList.slideUp(300);
            }
        });
        $(document).mouseup(function(e){
            if (!dropdownWrapper.is(e.target) && dropdownWrapper.has(e.target).length === 0){
                dropdownList.slideUp(300);
            }
        });
    });
}
    
//Contacts regions init
function contactsRegionInit() {
    htmlRegions = '<span class="js-toggle-dropdown">'+contacts[0].region+'</span>';
    htmlRegions += '<ul class="contacts-content__region-list js-dropdown-list" style="display: none;">';
    $.each(contacts, function (index, item) {
        htmlRegions += '<li class="contacts-content__region-item">';
        if (index === 0) {
            htmlRegions += '<span class="contacts-content__region-item-text js-dropdown-item contacts-content__region-item-text--active" data-active="contacts-content__region-item-text--active">';
            regionOfficesInit(item.region);
        } else {
            htmlRegions += '<span class="contacts-content__region-item-text js-dropdown-item" data-active="contacts-content__region-item-text--active">';
        }
        htmlRegions += item.region;
        htmlRegions += '</span>';
        htmlRegions += '</li>';
    });
    htmlRegions+="</ul>";
    $(".contacts-content__region-desc").append(htmlRegions);
}

//Catalog dropdown menu
function catalogDropdownMenuInit() {
    var catalogMenuTooltip = $('.catalog-open-button.ready').each(function() { 
		$(this).qtip({
			content: {
				text: $('.catalog-dropdown-menu'),
			},
			position: {
				my: 'bottom center',
				at: 'top center',
				target: $('.row--page-top'),
				adjust: {
					x: -0,
                    y: -17
				},
				container: $('.row--page-top'),
				viewport: $('.row--page-top')
			},
			show: {
				event: 'click focus',
				solo: true,
                effect: function() {
                    $(this).slideDown(300);
                }
			},
			hide: {
				event: 'unfocus',
				/*inactive: 5000,*/
                effect: function() {
                    $(this).slideUp(300);
                }
			},
			style: {
				classes: 'qtip',
                tip: {
                    corner: false
                }
			},
			events: {
				show: function(event, api) {
                    $('.catalog-open-button').addClass('active').removeClass('ready');
				},
				hide: function(event, api) {
                    $('.catalog-open-button').removeClass('active').addClass('ready');
				}				
			}
		});
    });
    $(document).keyup(function(e) {
        if (e.key === "Escape") { // escape key maps to keycode `27`
            catalogMenuTooltip.qtip('hide');
        }
    });
    $('.col--catalog-open-button').on('click', '.catalog-open-button.active', function(){
        catalogMenuTooltip.qtip('hide');
    });
}

//Sliders
function slidersInit() {
    $('.home-slider').slick({
        dots: true,
        infinite: true,
        arrows: false,
        dotsClass: 'home-slider__nav',
    });
    $('.home-best-price-slider').slick({
        dots: false,
        infinite: true,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
    });
    $('.category-slider').slick({
        dots: false,
        infinite: true,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        rows: 2,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
    });
    $('.specials-slider').slick({
        dots: true,
        infinite: true,
        arrows: false,
        vertical: true,
        verticalSwiping: true,
        dotsClass: 'specials-slider__nav',
    });
    $('.needs-slider').slick({
        dots: false,
        infinite: true,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: $('.needs-filter__slick-prev'),
        nextArrow: $('.needs-filter__slick-next'),
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
    });
    var needsFilter = 0;
    var needsFilterFiltered = false;
    $('.needs-filter__item').on('click', function(){
        if(needsFilterFiltered == true) {
            $('.needs-slider').slick('slickUnfilter');
        }
        $('.needs-filter__item').removeClass('active');
        needsFilter = $(this).attr('data-filter');
        $('.needs-slider').slick('slickFilter', '[data-filter='+needsFilter+']');
        $(this).addClass('active');
        needsFilterFiltered = true;
    });
    $('.needs-filter__reset').on('click', function(){
        if(needsFilterFiltered == true) {
            $('.needs-slider').slick('slickUnfilter');
            needsFilter = 0;
            $('.needs-filter__item').removeClass('active');
        }
    });
    $('.new-items-slider,\
        .best-price-slider,\
        .similar-products-slider,\
        .related-products-slider').slick({
        dots: false,
        infinite: true,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
    });
}

//Popups
function popupsInit() {
    $('.product-page__one-click-buy, .product-page__add-to-cart').magnificPopup({
        items: {
            src: '#popup-cart',
            type: 'inline'
        }
    });
    $('.account-cart__btn--payment').magnificPopup({
        items: {
            src: '#popup-payment',
            type: 'inline'
        }
    });
}

//Company page title change
function companyPageTitleChangeInit() {
    $('.left-column-menu--company a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $('.company__title h2').text($(this).text());
    });
}

//Phone mask
function phoneMaskInit() {
    $("[name='phone']").mask("+7(999) 999-9999");
}

//Match height of some elements
function matchHeightOfElementsInit() {
    $('.product').matchHeight();
    $('.product__title').matchHeight();
    $('.category-slider__slide .product').matchHeight({ byRow: false });
    $('.category-slider__slide .product__title').matchHeight({ byRow: false });
    $('.service').matchHeight();
}

//Product quantity value
function productQuantityValueChangeInit() {
    $('.quantity-minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.quantity-plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
}

//Contacts region offices init
function regionOfficesInit(region) {
    $.each(contacts, function (index, item) {
        if (item.region == region) {
            htmlOffices = '<span class="js-toggle-dropdown">'+item.offices[0].address+'</span>';
            htmlOffices += '<ul class="contacts-content__address-list js-dropdown-list" style="display: none;">';
            $.each(item.offices, function (index1, item1) {
                htmlOffices += '<li class="contacts-content__address-item">';
                if (index1 === 0) {
                    htmlOffices += '<span data-id="'+item1.id+'" class="contacts-content__address-item-text js-dropdown-item contacts-content__address-item-text--active" data-active="contacts-content__address-item-text--active">';
                } else {
                    htmlOffices += '<span data-id="'+item1.id+'" class="contacts-content__address-item-text js-dropdown-item" data-active="contacts-content__address-item-text--active">';
                }
                htmlOffices += item1.address;
                htmlOffices += '</span>';
                htmlOffices += '</li>';
            });
            htmlOffices += '</ul>';
        }
    });
    $(".contacts-content__address-desc").empty();
    $(".contacts-content__address-desc").append(htmlOffices);
    initMapControls();
    $(".contacts-content__address-item-text--active").trigger("click");
}

//Content custom scroll
function contentCustomScrollInit() {
    $('.account-conditions').cuteScroll({
        create:{// is the command object
            area:{
                // any css settings
                height:'255px'
            },
            bar:{
                right: '18px',
                width: '8px',
                height: '50px',
                minHeight: '',
                borderRadius: '4px',
                background: '#FE5900',
                opacity: 1,
            },
            rail:{
                right: '20px',
                width: '4px',
                borderRadius: '2px',
                background: '#D8D8D8',
                opacity: 1,
                visible: true,
            },
            mouse:{
                wheelStep:60,// scroll step for a wheel
            },
        }
    });
}

//Интерактивная Яндекс.Карта
var contactsMap;
var officesGroup;

if (typeof YMaps !== 'undefined') {
    YMaps.jQuery(function () {
        // Создание экземпляра карты и его привязка к созданному контейнеру
        contactsMap = new YMaps.Map(YMaps.jQuery("#YMapsID")[0]);
        // Создает объект YMaps.Zoom с пользовательскими подсказками и добавляет его на карту.
        // Коэффициенту масштабирования 1 соответствует подсказка "Мелко",
        // коэффициенту масштабирования 9 - "Средне",
        // коэффициенту масштабирования 16 - "Крупно".
        var zoom = new YMaps.Zoom({
            /*customTips: [
                { index: 1, value: "Мелко" },
                { index: 9, value: "Средне" },
                { index: 16, value: "Крупно" }
            ]*/
        });

        //Добавление элемента управления на карту
        contactsMap.addControl(zoom);		

        // Установка для карты ее центра и масштаба
        contactsMap.setCenter(new YMaps.GeoPoint(30.253256, 59.928879), 16);
        
        // Создание группы объектов и добавление ее на карту
        officesGroup = new YMaps.GeoObjectCollection();
        $.each(contacts, function (index, item) {
            $.each(item.offices, function (index1, item1) {
                officesGroup.add(createPlacemark(new YMaps.GeoPoint(item1.longitude, item1.latitude), item.region, item1.address, item1.id));
            });
        });
        contactsMap.addOverlay(officesGroup);

        // Создание управляющего элемента "Путеводитель по офисам"
        contactsMap.addControl(new OfficeNavigator(officesGroup));
        
    });
}

// Функия создания метки
function createPlacemark (geoPoint, name, description, id) {
    
    // Создает стиль
    var s = new YMaps.Style();

    // Создает стиль значка метки
    s.iconStyle = new YMaps.IconStyle();
    s.iconStyle.href = "img/pointer.svg";
    s.iconStyle.size = new YMaps.Point(29, 41);
    s.iconStyle.offset = new YMaps.Point(-15, -42);		
    var placemark = new YMaps.Placemark(geoPoint, {style: s});
    placemark.name = name;
    placemark.description = description;
    placemark.id = id;
    return placemark;
}

// Управляющий элемент "Путеводитель по офисам", реализиует интерфейс YMaps.IControl
function OfficeNavigator (offices) {

    // Добавление на карту
    this.onAddToMap = function (map, position) {

            this.map = map;
            this.position = position || new YMaps.ControlPosition(YMaps.ControlPosition.TOP_RIGHT, new YMaps.Size(10, 10));
            
            // Формирование списка офисов
            this._generateList();
            
            // Применение позиции к управляющему элементу
            this.position.apply(this.wrapper);

    }

    // Удаление с карты
    this.onRemoveFromMap = function () {
        this.container.remove();
        this.container = this.map = null;
    };

    // Пока "летим" игнорируем клики по ссылкам
    this.isFlying = 0;

    // Формирование списка офисов
    this._generateList = function () {
        var _this = this;
        
        // Для каждого объекта вызываем функцию-обработчик
        offices.forEach(function (obj) {
            // Создание ссылок на объект
            var li = YMaps.jQuery("[data-id="+ obj.id +"]");
            
            // Создание обработчиков щелчка по ссылкам
            li.bind("click", function () {
                if (!_this.isFlying) {
                    _this.isFlying = 1;
                    _this.map.panTo(obj.getGeoPoint(), {
                        flying: 1,
                        callback: function () {
                            obj.openBalloon();
                            _this.isFlying = 0;
                        }
                    });
                }
                return false;
            });
            
        });
    };
}

// Init map controls from anywhere
function initMapControls () {
    if (typeof YMaps !== 'undefined') {
        contactsMap.addControl(new OfficeNavigator(officesGroup));
    }
}