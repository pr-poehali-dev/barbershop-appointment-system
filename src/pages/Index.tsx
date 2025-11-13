import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  duration_minutes: number;
}

interface Master {
  id: number;
  name: string;
  specialization: string;
  bio: string;
  avatar_url: string | null;
}

export default function Index() {
  const [services, setServices] = useState<Service[]>([]);
  const [masters, setMasters] = useState<Master[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    fetch('https://functions.poehali.dev/fff73877-5a9e-457a-9cbf-97fd1ce4e4eb')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error('Error loading services:', err));

    fetch('https://functions.poehali.dev/1478a560-bcb2-42f5-8fa6-12bccc20f2ba')
      .then(res => res.json())
      .then(data => setMasters(data))
      .catch(err => console.error('Error loading masters:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Scissors" className="text-primary" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Премиум Салон</h1>
                <p className="text-sm text-muted-foreground">Искусство стиля</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <button
                onClick={() => setActiveSection('home')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setActiveSection('services')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'services' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Услуги
              </button>
              <button
                onClick={() => setActiveSection('masters')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'masters' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Мастера
              </button>
              <button
                onClick={() => setActiveSection('booking')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'booking' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Запись
              </button>
            </nav>
            <Button className="hidden md:flex">
              <Icon name="User" size={16} className="mr-2" />
              Личный кабинет
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {activeSection === 'home' && (
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <Badge className="mb-4" variant="secondary">
              <Icon name="Sparkles" size={14} className="mr-1" />
              Премиум качество обслуживания
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Ваш стиль —<br />наша страсть
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Профессиональные мастера с многолетним опытом создадут идеальный образ 
              в атмосфере роскоши и комфорта
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" onClick={() => setActiveSection('booking')} className="text-base">
                <Icon name="Calendar" size={18} className="mr-2" />
                Записаться онлайн
              </Button>
              <Button size="lg" variant="outline" onClick={() => setActiveSection('services')} className="text-base">
                <Icon name="List" size={18} className="mr-2" />
                Наши услуги
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Лет опыта</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                <div className="text-sm text-muted-foreground">Довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">3</div>
                <div className="text-sm text-muted-foreground">Мастера</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {activeSection === 'services' && (
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">
                <Icon name="Sparkles" size={14} className="mr-1" />
                Каталог услуг
              </Badge>
              <h2 className="text-4xl font-bold mb-4">Наши услуги</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Широкий спектр профессиональных услуг для создания вашего идеального образа
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Sparkles" className="text-primary" size={20} />
                      </div>
                      <Badge variant="secondary">{service.duration_minutes} мин</Badge>
                    </div>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {parseFloat(service.price).toLocaleString('ru-RU')} ₽
                      </span>
                      <Button size="sm">
                        <Icon name="Calendar" size={14} className="mr-1" />
                        Записаться
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Masters Section */}
      {activeSection === 'masters' && (
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">
                <Icon name="Users" size={14} className="mr-1" />
                Команда профессионалов
              </Badge>
              <h2 className="text-4xl font-bold mb-4">Наши мастера</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Высококвалифицированные специалисты с многолетним опытом и креативным подходом
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {masters.map((master) => (
                <Card key={master.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mx-auto mb-4 flex items-center justify-center">
                      <Icon name="User" className="text-primary" size={40} />
                    </div>
                    <CardTitle className="text-xl">{master.name}</CardTitle>
                    <Badge variant="secondary" className="w-fit mx-auto">
                      {master.specialization}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      {master.bio}
                    </p>
                    <Button className="w-full" variant="outline">
                      <Icon name="Calendar" size={14} className="mr-2" />
                      Записаться к мастеру
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking Section */}
      {activeSection === 'booking' && (
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <Badge className="mb-4" variant="secondary">
                <Icon name="Calendar" size={14} className="mr-1" />
                Онлайн запись
              </Badge>
              <h2 className="text-4xl font-bold mb-4">Запись на услугу</h2>
              <p className="text-muted-foreground">
                Выберите удобное время и запишитесь к нашим мастерам онлайн
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Авторизация</CardTitle>
                <CardDescription>Войдите в систему для создания записи</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="client">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="client">
                      <Icon name="User" size={16} className="mr-2" />
                      Я клиент
                    </TabsTrigger>
                    <TabsTrigger value="master">
                      <Icon name="Scissors" size={16} className="mr-2" />
                      Я мастер
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="client" className="space-y-4">
                    <div className="text-center p-8 border rounded-lg border-dashed">
                      <Icon name="UserCircle" size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2">Вход для клиентов</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Войдите, чтобы записаться на услугу и просмотреть историю посещений
                      </p>
                      <Button className="w-full">
                        <Icon name="LogIn" size={16} className="mr-2" />
                        Войти как клиент
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="master" className="space-y-4">
                    <div className="text-center p-8 border rounded-lg border-dashed">
                      <Icon name="Briefcase" size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2">Вход для мастеров</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Войдите для управления расписанием и просмотра записей клиентов
                      </p>
                      <Button className="w-full">
                        <Icon name="LogIn" size={16} className="mr-2" />
                        Войти как мастер
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t mt-20 py-8 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Премиум Салон</h3>
              <p className="text-sm text-muted-foreground">
                Профессиональные услуги парикмахера премиум-класса
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={14} />
                  +7 (999) 123-45-67
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  info@salon.ru
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={14} />
                  Москва, ул. Примерная, 1
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Часы работы</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>Пн-Пт: 10:00 - 19:00</div>
                <div>Сб-Вс: Выходной</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-3">
                <Button size="icon" variant="outline">
                  <Icon name="Instagram" size={18} />
                </Button>
                <Button size="icon" variant="outline">
                  <Icon name="Facebook" size={18} />
                </Button>
                <Button size="icon" variant="outline">
                  <Icon name="Twitter" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 Премиум Салон. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}