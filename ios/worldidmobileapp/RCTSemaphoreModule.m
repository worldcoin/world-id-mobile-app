// RCTCalendarModule.m
#import "RCTSemaphoreModule.h"
#import <React/RCTLog.h>

// To export a module named RCTCalendarModule
@interface RCT_EXTERN_MODULE(Semaphore, NSObject)

RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(generateIdentityCommitment:(NSString*)seed)
RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(hashBytesToField:(NSString*)input)
RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(hashStringToField:(NSString*)input)

RCT_EXTERN_METHOD(generateProofPacked:(NSString*)seed
                  external_nullifier_hash:(NSString*)external_nullifier_hash
                  signal_hash:(NSString*)signal_hash
                  merkle_proof:(NSString*)merkle_proof
                  callback:(RCTResponseSenderBlock))

RCT_EXTERN_METHOD(generateProof:(NSString*)seed
                  external_nullifier_hash:(NSString*)external_nullifier_hash
                  signal_hash:(NSString*)signal_hash
                  merkle_proof:(NSString*)merkle_proof
                  callback:(RCTResponseSenderBlock))

@end

