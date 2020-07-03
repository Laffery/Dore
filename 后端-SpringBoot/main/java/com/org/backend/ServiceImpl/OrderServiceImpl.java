package com.org.backend.ServiceImpl;

import com.org.backend.Dao.BookDao;
import com.org.backend.Dao.OrderItemDao;
import com.org.backend.Dao.UserDao;
import com.org.backend.DaoImpl.OrderDaoImpl;
import com.org.backend.Entity.Book;
import com.org.backend.Entity.Order;
import com.org.backend.Entity.OrderItem;
import com.org.backend.Entity.User;
import com.org.backend.Service.OrderService;
import com.org.backend.Util.bookSell;
import com.org.backend.Util.userBuy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderDaoImpl orderDao;
    @Autowired
    private OrderItemDao orderItemDao;
    @Autowired
    private BookDao bookDao;
    @Autowired
    private UserDao userDao;

    private final DateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");

    public OrderItem implOrderItem(OrderItem item) {
        Book book = item.getBook();
        Integer id = book.getID();
        item.setBook(bookDao.getOne(id));
        return item;
    }

    @Override
    public Order getByID(Integer id){
        Order order = orderDao.getOne(id);
        List<OrderItem> items = orderItemDao.getByOrderID(id);
        List<OrderItem> items1 = new ArrayList<>();

        for(OrderItem item : items){
            items1.add(implOrderItem(item));
        }

        order.setItems(items1);
        User user = new User();
        user.setID(order.getUser().getID());
        user.setName(order.getUser().getName());
        order.setUser(user);
        return order;
    }

    private List<Order> implOrders(List<Order> orders) {
        List<Order> res = new ArrayList<>();
        for(Order order : orders){
            res.add(getByID(order.getID()));
        }

        return res;
    }

    @Override
    public List<Order> getAll(){
        List<Order> orders = orderDao.getAll();
        return implOrders(orders);
    }

    @Override
    public List<Order> getPage(Integer no, Integer size) {
        List<Order> orders = orderDao.getPage(no - 1, size);
        return implOrders(orders);
    }

    @Override
    public List<Order> getByUserID(Integer id){
        List<Order> orders = orderDao.getByUserID(id);
        return implOrders(orders);
    }

    private String DateTime() {
        Date date = new Date();
        return format.format(date);
    }

    @Override
    public List<Order> During(Date start, Date end) {
        List<Order> orders = getAll();

        List<Order> res = new ArrayList<>();
        for (Order order : orders) {
            try {
                String dateString = order.getDate();
                Date date = format.parse(dateString);
                if (date.compareTo(start) > 0 && date.compareTo(end) < 0)
                    res.add(order);
            }catch (ParseException e) {
                System.out.println(e.getMessage());
            }
        }
        return res;
    }

    @Override
    public List<Order> userDuring(Integer uid, Date start, Date end) {
        List<Order> orders = During(start, end);
        List<Order> res = new ArrayList<>();
        for (Order order : orders) {
            if (Objects.equals(order.getUser().getID(), uid))
                res.add(order);
        }

        return res;
    }

    private boolean checkStock(OrderItem orderItem) {
        Integer count = orderItem.getCount();
        Integer bid = orderItem.getBook().getID();
        Integer stock = bookDao.getOne(bid).getStock();
        return (stock < count);
    }

    private Integer getOrderID(Integer uid, String date) {
        List<Order> orders = orderDao.getByDate(date);
        for (Order order : orders) {
            if (Objects.equals(order.getUser().getID(), uid))
                return order.getID();
        }

        return 0;
    }

    @Override
    public List<bookSell> sellRank(Date start, Date end) {
        List<Order> orders = During(start, end);
        List<bookSell> bookSellList = new ArrayList<>();

        for(Order order : orders) {
            List<OrderItem> items = order.getItems();
            for(OrderItem item : items) {
                Book book = item.getBook();
                int bid = book.getID();
                int count = item.getCount();
                boolean flag = false;

                for(bookSell booksell : bookSellList) {
                    if (Objects.equals(booksell.getBook().getID(), bid)) {
                        flag = true;
                        booksell.setSold(booksell.getSold() + count);
                        break;
                    }
                }

                if (!flag) {
                    bookSell tmp = new bookSell(book, count);
                    bookSellList.add(tmp);
                }
            }
        }

        bookSellList.sort(new Comparator<bookSell>() {
            @Override
            public int compare(bookSell o1, bookSell o2) {
                return Integer.compare(o2.getSold(), o1.getSold());
            }
        });

        return bookSellList;
    }

    @Override
    public List<userBuy> buyRank(Date start, Date end) {
        List<Order> orders = During(start, end);
        List<userBuy> userBuyList = new ArrayList<>();
        for (Order order : orders) {
            User user = userDao.getOne(order.getUser().getID());
            user.setPassword(null);
            int uid = user.getID();

            boolean flag = false;
            for(userBuy buy : userBuyList) {
                if (buy.getUser().getID() == uid) {
                    flag = true;
                    buy.setPrice(buy.getPrice() + order.getPrice());
                    break;
                }
            }

            if(!flag) {
                userBuy tmp = new userBuy(user, order.getPrice());
                userBuyList.add(tmp);
            }
        }

        userBuyList.sort(new Comparator<userBuy>() {
            @Override
            public int compare(userBuy o1, userBuy o2) {
                return Double.compare(o2.getPrice(), o1.getPrice());
            }
        });

        return userBuyList;
    }

    @Override
    public userBuy bought(int id, Date start, Date end) {
        User user = userDao.getOne(id);
        user.setPassword(null);
        userBuy buy = new userBuy(user, 0);
        List<bookSell> bookSellList = new ArrayList<>();

        List<Order> orders = During(start, end);
        for (Order order : orders) {
            if (!Objects.equals(order.getUser().getID(), user.getID()))
                continue;

            List<OrderItem> items = order.getItems();
            for (OrderItem item : items) {
                boolean flag = false;
                for (bookSell booksell : bookSellList) {
                    if (Objects.equals(booksell.getBook().getID(), item.getBook().getID())) {
                        flag = true;
                        booksell.setSold(booksell.getSold() + item.getCount());
                        break;
                    }
                }

                if (!flag) {
                    bookSell tmp = new bookSell(item.getBook(), item.getCount());
                    bookSellList.add(tmp);
                }
            }
        }

        buy.setBookList(bookSellList);
        return buy;
    }

    @Override
    public String save(Order order) {
        Double total = 0.00;
        List<OrderItem> items = order.getItems();
        for (OrderItem item : items) {
            if (checkStock(item))
                return "item error";
            total += item.getPrice();
        }

        Integer uid = order.getUser().getID();
        String date = DateTime();
        order.setUser(userDao.getOne(uid));
        order.setDate(date);
        order.setPrice(total);
        orderDao.save(order);

        Integer oid = getOrderID(uid, date);

        if (oid == 0)
            return "generate error";

        Order res = orderDao.getOne(oid);

        for (OrderItem item : items) {
            item.setOrder(res);
            Book book = bookDao.getOne(item.getBook().getID());
            book.setStock(book.getStock() - item.getCount());
            bookDao.update(book);
            orderItemDao.save(item);
        }

        res.setItems(items);

        orderDao.save(res);

        return "success";
    }

    @Override
    public void delete(Integer id){
        Order order = getByID(id);
        List<OrderItem> items = order.getItems();
        for(OrderItem item : items)
            orderItemDao.delete(item.getId());

        orderDao.delete(id);
    }
}
