export function metrics(data) {
  const productMap = new Map(data.products.map(p => [p.id, p]));
  const fulfilled = data.orders.filter(o => ['Shipped', 'Delivered'].includes(o.status));
  const revenue = fulfilled.reduce((sum, o) => sum + (productMap.get(o.productId)?.price ?? 0) * o.quantity, 0);
  return {
    totalProducts: data.products.length,
    stockUnits: data.products.reduce((s,p)=>s+p.stock,0),
    lowStock: data.products.filter(p=>p.stock<=p.reorderPoint).length,
    totalOrders: data.orders.length,
    fulfilledOrders: fulfilled.length,
    fulfillmentRate: data.orders.length ? Math.round(fulfilled.length/data.orders.length*100) : 0,
    revenue,
    inventoryValue: data.products.reduce((s,p)=>s+p.stock*p.cost,0)
  };
}
export function reorderQuantity(product) {
  return product.stock <= product.reorderPoint ? Math.max(0, product.reorderPoint * 2 - product.stock) : 0;
}
export function fulfillOrder(data, id) {
  const order=data.orders.find(o=>o.id===id);
  if (!order) throw Object.assign(new Error('Order not found'),{status:404});
  if(order.status!=='Pending') throw Object.assign(new Error('Only pending orders can be shipped'),{status:400});
  const product=data.products.find(p=>p.id===order.productId);
  if(!product || product.stock<order.quantity) throw Object.assign(new Error('Insufficient inventory'),{status:409});
  product.stock-=order.quantity;
  order.status='Shipped';
  return order;
}
