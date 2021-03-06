
add_custom_target( build_hardfork_hpp
                   COMMAND cat-parts "${CMAKE_CURRENT_SOURCE_DIR}/hardfork.d" "${CMAKE_CURRENT_BINARY_DIR}/include/capricorn/chain/hardfork.hpp" )
set_source_files_properties( "${CMAKE_CURRENT_BINARY_DIR}/include/capricorn/chain/hardfork.hpp" PROPERTIES GENERATED TRUE )

add_dependencies( build_hardfork_hpp cat-parts )

file(GLOB HEADERS "include/capricorn/chain/*.hpp")
file(GLOB PROTOCOL_HEADERS "include/capricorn/chain/protocol/*.hpp")

if( CAPRICORN_DISABLE_UNITY_BUILD )
   set( CAPRICORN_DB_FILES
        db_balance.cpp
        db_block.cpp
        db_debug.cpp
        db_getter.cpp
        db_init.cpp
        db_maint.cpp
        db_management.cpp
        db_market.cpp
        db_update.cpp
        db_delegate_schedule.cpp
      )
   message( STATUS "Capricorn database unity build disabled" )
else( CAPRICORN_DISABLE_UNITY_BUILD )
   set( CAPRICORN_DB_FILES
        database.cpp )
   message( STATUS "Capricorn database unity build enabled" )
endif( CAPRICORN_DISABLE_UNITY_BUILD )

## SORT .cpp by most likely to change / break compile
add_library( capricorn_chain

             # As database takes the longest to compile, start it first
             ${CAPRICORN_DB_FILES}
             fork_database.cpp

             protocol/types.cpp
             protocol/address.cpp
             protocol/authority.cpp
             protocol/asset.cpp
             protocol/assert.cpp
             protocol/account.cpp
             protocol/transfer.cpp
             protocol/council_member.cpp
             protocol/delegate.cpp
             protocol/market.cpp
             protocol/proposal.cpp
             protocol/withdraw_permission.cpp
             protocol/asset_ops.cpp
             protocol/memo.cpp
             protocol/worker.cpp
             protocol/custom.cpp
             protocol/operations.cpp
             protocol/transaction.cpp
             protocol/block.cpp
             protocol/fee_schedule.cpp
             protocol/confidential.cpp
             protocol/vote.cpp

             genesis_state.cpp
             get_config.cpp

             pts_address.cpp

             evaluator.cpp
             balance_evaluator.cpp
             account_evaluator.cpp
             assert_evaluator.cpp
             delegate_evaluator.cpp
             council_member_evaluator.cpp
             asset_evaluator.cpp
             transfer_evaluator.cpp
             proposal_evaluator.cpp
             market_evaluator.cpp
             vesting_balance_evaluator.cpp
             withdraw_permission_evaluator.cpp
             worker_evaluator.cpp
             confidential_evaluator.cpp
             special_authority.cpp
             buyback.cpp

             account_object.cpp
             asset_object.cpp
             fba_object.cpp
             proposal_object.cpp
             vesting_balance_object.cpp

             block_database.cpp

             is_authorized_asset.cpp

             ${HEADERS}
             ${PROTOCOL_HEADERS}
             "${CMAKE_CURRENT_BINARY_DIR}/include/capricorn/chain/hardfork.hpp"
           )

add_dependencies( capricorn_chain build_hardfork_hpp )
target_link_libraries( capricorn_chain fc capricorn_db )
target_include_directories( capricorn_chain
                            PUBLIC "${CMAKE_CURRENT_SOURCE_DIR}/include" "${CMAKE_CURRENT_BINARY_DIR}/include" )

if(MSVC)
  set_source_files_properties( db_init.cpp db_block.cpp database.cpp block_database.cpp PROPERTIES COMPILE_FLAGS "/bigobj" )
endif(MSVC)

INSTALL( TARGETS
   capricorn_chain

   RUNTIME DESTINATION bin
   LIBRARY DESTINATION lib
   ARCHIVE DESTINATION lib
)
INSTALL( FILES ${HEADERS} DESTINATION "include/capricorn/chain" )
INSTALL( FILES ${PROTOCOL_HEADERS} DESTINATION "include/capricorn/chain/protocol" )
