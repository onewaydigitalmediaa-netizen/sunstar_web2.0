import React from 'react';
import {motion,useReducedMotion} from 'framer-motion';

export default function Reveal({as='div',className,children,delay=0,amount=0.16,...props}){
 const reduceMotion=useReducedMotion();
 const Component=motion[as]||motion.div;
 return <Component className={className} initial={reduceMotion?false:{opacity:0,y:22}} whileInView={reduceMotion?undefined:{opacity:1,y:0}} viewport={{once:true,amount,margin:'0px 0px -48px 0px'}} transition={{duration:reduceMotion?0:.58,delay:reduceMotion?0:delay,ease:[.22,1,.36,1]}} {...props}>{children}</Component>;
}
