'use client'
import Header from './components/Header';
import StartButton from './components/StartButton';

export default function Home(){
  return (
    <div class="flex flex-col h-screen">
      <Header />
      <div class="grid h-100 grid-cols-12 gap-4 flex-col mx-auto">
        <div class="p-4 col-span-2"/>
        <div class="p-4 col-span-3 text-center flex flex-col justify-center">
          <h1 class="text-3xl p-6">Crafting harmony<br/> in every digital moment.</h1>
          <br/>
          <div class="border-solid border-2 border-white-500">
            <h4>We are not just a product - <br/> we are your other half to come up <br/> with a design that is truly yours.</h4>
          </div>
          <br/>
          <div class="p-6"><StartButton /></div>
        </div>
        <div class="p-4 col-span-1"/>
        <div class="p-4 col-span-6 justify-center flex flex-col">
          <img style={{borderRadius: '20px'}} src="https://images.unsplash.com/photo-1459664018906-085c36f472af?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
        </div>
      </div>
    </div>
  );
}