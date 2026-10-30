import test from 'node:test';import assert from 'node:assert/strict';
import {metrics,reorderQuantity,fulfillOrder} from './logic.js';
test('reorder recommendation is zero above threshold',()=>assert.equal(reorderQuantity({stock:30,reorderPoint:20}),0));
test('reorder recommendation doubles threshold less current stock',()=>assert.equal(reorderQuantity({stock:12,reorderPoint:20}),28));
test('shipment deducts stock once',()=>{const d={products:[{id:'P1',stock:8,cost:3,price:10,reorderPoint:2}],orders:[{id:'O1',productId:'P1',quantity:3,status:'Pending'}]};fulfillOrder(d,'O1');assert.equal(d.products[0].stock,5);assert.equal(metrics(d).revenue,30);assert.throws(()=>fulfillOrder(d,'O1'))});
test('shipment cannot oversell',()=>{const d={products:[{id:'P1',stock:1}],orders:[{id:'O1',productId:'P1',quantity:2,status:'Pending'}]};assert.throws(()=>fulfillOrder(d,'O1'));assert.equal(d.products[0].stock,1)});
