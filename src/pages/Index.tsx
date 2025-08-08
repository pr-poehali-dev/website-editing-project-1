import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const categories = [
    { id: 'all', name: 'Все категории' },
    { id: 'electronics', name: 'Электроника' },
    { id: 'accessories', name: 'Аксессуары' },
    { id: 'fashion', name: 'Мода' }
  ];

  const priceRanges = [
    { id: 'all', name: 'Любая цена' },
    { id: 'under-50', name: 'До 5 000 ₽' },
    { id: '50-100', name: '5 000 - 15 000 ₽' },
    { id: 'over-100', name: 'Свыше 15 000 ₽' }
  ];

  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 89999,
      originalPrice: 99999,
      image: '/img/0e4180a6-1ece-4d89-915b-45cb4514a6a4.jpg',
      category: 'electronics',
      rating: 4.8,
      reviews: 142,
      badge: 'Хит продаж'
    },
    {
      id: 2,
      name: 'AirPods Pro',
      price: 19999,
      originalPrice: 24999,
      image: '/img/b77a4b28-bd16-4daf-94c3-032bd6dfd744.jpg',
      category: 'electronics',
      rating: 4.9,
      reviews: 89,
      badge: 'Скидка'
    },
    {
      id: 3,
      name: 'Городской рюкзак',
      price: 4999,
      originalPrice: null,
      image: '/img/656c5a22-3ae0-459d-8f17-38a7033a0f62.jpg',
      category: 'accessories',
      rating: 4.6,
      reviews: 67,
      badge: 'Новинка'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange === 'under-50') matchesPrice = product.price < 5000;
    else if (priceRange === '50-100') matchesPrice = product.price >= 5000 && product.price <= 15000;
    else if (priceRange === 'over-100') matchesPrice = product.price > 15000;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold gradient-text">TechStore</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Icon name="Heart" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-5xl font-bold mb-6 gradient-text">
            Современные технологии
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Откройте для себя лучшие товары с быстрой доставкой и гарантией качества
          </p>

        </div>

        {/* Search and Filters */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-12 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Поиск товаров..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map(range => (
                  <SelectItem key={range.id} value={range.id}>
                    {range.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <Card key={product.id} className="group hover-scale bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge 
                    className={`${
                      product.badge === 'Хит продаж' ? 'bg-primary' : 
                      product.badge === 'Скидка' ? 'bg-destructive' : 'bg-accent'
                    } text-white px-3 py-1`}
                  >
                    {product.badge}
                  </Badge>
                </div>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Icon name="Heart" size={18} />
                </Button>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Icon 
                        key={i} 
                        name="Star" 
                        size={16} 
                        className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">
                      {product.price.toLocaleString()} ₽
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {product.originalPrice.toLocaleString()} ₽
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300">
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Icon name="ShoppingBag" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-2">Товары не найдены</h3>
            <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="ShoppingBag" className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold gradient-text">TechStore</h3>
              </div>
              <p className="text-muted-foreground">
                Современные технологии для современной жизни
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Электроника</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Аксессуары</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Мода</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Помощь</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Доставка</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Возврат</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Icon name="Phone" size={16} className="mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">+7 (800) 123-45-67</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Mail" size={16} className="mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">help@techstore.ru</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 TechStore. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;