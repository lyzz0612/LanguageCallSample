//
//  TestStatic.m
//  LanguageCallSample
//
//  Created by lingyun on 16/11/27.
//
//

#import <Foundation/Foundation.h>
@interface TestStatic : NSObject

@end


@implementation TestStatic

+(NSString*) jsCalledWithParam: (NSString*)argc1 {
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle: @"单参数" message:argc1 delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"OK", nil];
    [alertView show];
    
    return @"OC单参数调用返回值";
}
+(NSString*) jsCallWithString: (NSString*)argc1 AndInt: (NSNumber*) argc2 AndFloat: (NSNumber*) argc3 AndBool: (BOOL) argc4 {
    NSString* msg = [NSString stringWithFormat: @"%@+%@+%@+%@", argc1, argc2, argc3, argc4 ? @"YES" : @"NO"];
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle: @"多参数" message:msg delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"OK", nil];
    [alertView show];
    
    return @"OC多参数调用返回值";
}
+(NSString*) jsCalledNoParam {
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle: @"无参数" message:@"无参数" delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"OK", nil];
    [alertView show];
    
    return @"OC无参数调用返回值";
}
@end