import ListItem from './ListItem';

export default function List(props) {
  const { items, theme = 'light', isAbsoluteLabel, ENVIRONMENT, amountToDisplay, showBidder } = props;

  let total = 0
  for(var i in items) {
    if(items[i]) {
      total++;
    }
  }

  let itemsMax = []

  for(var i in items) {

    if(i > amountToDisplay - 1){
      break;
    }

    itemsMax.push(items[i]);

  }

  return (
    <div className={`flex flex-col ${isAbsoluteLabel ? 'lg:self-end' : 'w-full'}`}>
      <div className="-my-2 sm:-ml-6 lg:-ml-0">
        <div className={`py-2 align-middle inline-block min-w-full sm:w-full lg:pr-0 sm:pr-6 relative ${isAbsoluteLabel ? 'lg:pl-6 lg:pr-0' : ''}`}>
          <div className="overflow-hidden sm:rounded-lg">
            <ul className={`min-w-full lg:min-w-0 ${isAbsoluteLabel ? 'lg-min-w-[530px]' : ''}`}>
             {itemsMax?.map((item, index) => item ? (
               <ListItem
                 key={`list-item-${theme}-${index}`}
                 index={index}
                 item={item}
                 theme={theme}
                 isAbsoluteLabel={isAbsoluteLabel}
                 ENVIRONMENT={ENVIRONMENT}
                 total={total}
                 showBidder={showBidder}
               />
             ) : null)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}