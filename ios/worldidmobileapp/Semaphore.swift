import Foundation
import SemaphoreSDK

@objc(Semaphore)
class Semaphore: NSObject {
  
  @objc func generateIdentityCommitment(_ seed: String) -> String {
    let id = SemaphoreSDK.new_identity(strdup(seed))
    let idcomm = SemaphoreSDK.generate_identity_commitment(id)
    return String(cString: idcomm!)
  }
  
  @objc func generateProofPacked(_ seed: String, external_nullifier_hash: String, signal_hash: String, merkle_proof: String, callback: @escaping RCTResponseSenderBlock) -> Void {
    let id = SemaphoreSDK.new_identity(strdup(seed))
    let idcomm = SemaphoreSDK.generate_identity_commitment(id)
    
    let merkle_proof = SemaphoreSDK.deserialize_merkle_proof(strdup(merkle_proof))
    
    let proof = SemaphoreSDK.generate_proof(id, strdup(external_nullifier_hash), strdup(signal_hash), merkle_proof)
    let proof_packed = SemaphoreSDK.encode_proof_packed(proof)
    callback([String(cString: proof_packed!)])
  }
  
  @objc func generateProof(_ seed: String, external_nullifier_hash: String, signal_hash: String, merkle_proof: String, callback: @escaping RCTResponseSenderBlock) -> Void {
    let id = SemaphoreSDK.new_identity(strdup(seed))
    let idcomm = SemaphoreSDK.generate_identity_commitment(id)
    
    let merkle_proof = SemaphoreSDK.deserialize_merkle_proof(strdup(merkle_proof))
    
    let proof = SemaphoreSDK.generate_proof(id, strdup(external_nullifier_hash), strdup(signal_hash), merkle_proof)
    let proof_serialized = SemaphoreSDK.serialize_groth16_proof(proof)
    callback([String(cString: proof_serialized!)])
  }
  
  @objc func hashBytesToField(_ input: String) -> String {
    let hash = SemaphoreSDK.hash_bytes_to_field(strdup(input))
    return String(cString: hash!)
  }
  
  @objc func hashStringToField(_ input: String) -> String {
    let hash = SemaphoreSDK.hash_string_to_field(strdup(input))
    return String(cString: hash!)
  }
}
